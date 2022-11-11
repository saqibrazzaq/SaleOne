using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("Country")]
    public class Country
    {
        [Key]
        public int CountryId { get; set; }
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        [Required, MaxLength(3)]
        public string? Code { get; set; }

        // Child tables
        public IEnumerable<State>? States { get; set; }
    }
}
