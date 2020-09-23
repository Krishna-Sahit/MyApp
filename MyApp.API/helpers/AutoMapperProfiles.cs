using System.Linq;
using AutoMapper;
using MyApp.API.DTOs;
using MyApp.API.Models;

namespace MyApp.API.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListdto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                    src => src.Photos.FirstOrDefault(p => p.isMain).url))
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                    src => src.Photos.FirstOrDefault(p => p.isMain).url))
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoForDetailDto>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>();
            CreateMap<Message, MessageForCreationDto>();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(
                    u => u.Sender.Photos.FirstOrDefault(p => p.isMain).url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(
                    src => src.Recipient.Photos.FirstOrDefault(p => p.isMain).url));
        }
    }
}