using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.API.Data;
using MyApp.API.DTOs;
using MyApp.API.helpers;
using MyApp.API.Models;

namespace MyApp.API.Controllers
{
    [ServiceFilter(typeof(loguseractivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IBasketballRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IBasketballRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            if(string.IsNullOrEmpty(userParams.Gender)){
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListdto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalPages, users.TotalCount);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {

            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto){
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }
            var userfromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userfromRepo);

            if(await _repo.SaveAll()){
                return NoContent();
            }

            throw new Exception($"updating user data of user {id} failed on save."); 
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId){
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }

            var like = await _repo.GetLike(id , recipientId);

            if(like != null)
                return BadRequest("You already like this user.");

            if(await _repo.GetUser(recipientId) == null)
                return NotFound();
            
            like = new Like{
                LikeeId = recipientId,
                LikerId = id
            };
            _repo.Add<Like>(like);

            if( await _repo.SaveAll()){
                return Ok();
            }

            return BadRequest("Unable to like this profile");
        }
    }
}