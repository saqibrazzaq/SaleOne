using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("State")]
    public class State
    {
        [Key]
        public int StateId { get; set; }
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        [Required, MaxLength(10)]
        public string? Code { get; set; }

        // Foreign keys
        [Required]
        public int CountryId { get; set; }
        [ForeignKey("CountryId")]
        public Country? Country { get; set; }

        // Child tables
        public IEnumerable<City>? Cities { get; set; }
    }
}
