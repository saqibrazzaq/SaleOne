using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public interface IRepositoryManager
    {
        ICategoryRepository CategoryRepository { get; }
        void Save();
    }
}
