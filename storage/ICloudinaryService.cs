using Microsoft.AspNetCore.Http;
using storage.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storage
{
    public interface ICloudinaryService
    {
        CloudinaryUploadResultRes UploadProfilePictureThumbnail(IFormFile file, string tempFolderPath);
        CloudinaryUploadResultRes UploadCategoryImage(IFormFile file, string tempFolderPath);
        CloudinaryUploadResultRes UploadProductImage(IFormFile file, string tempFolderPath);
        void DeleteImage(string? cloudinaryId);
    }
}
