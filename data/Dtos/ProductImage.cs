﻿using data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class ProductImageRes
    {
        public int ProductImageId { get; set; }
        public string? ImageUrl { get; set; }
        public string? CloudinaryId { get; set; }
        public bool IsMainImage { get; set; } = false;

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }

    public class ProductImageReqEdit
    {
        [Required]
        public string? ImageUrl { get; set; }
        [Required]
        public string? CloudinaryId { get; set; }
        public bool IsMainImage { get; set; } = false;

        [Required]
        public int ProductId { get; set; }
    }
}
