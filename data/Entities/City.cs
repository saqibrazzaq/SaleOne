using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("City")]
    public class City
    {
        [Key]
        public int CityId { get; set; }
        [Required, MaxLength(255)]
        public string? Name { get; set; }

        // Foreign keys
        [Required]
        public int StateId { get; set; }
        [ForeignKey("StateId")]
        public State? State { get; set; }
    }
}
