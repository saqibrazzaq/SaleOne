using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Utility.Paging
{
    public sealed class ApiOkPagedResponse<ResultList, ResultMetaData>
    {
        public ResultList PagedList { get; set; }
        public ResultMetaData MetaData { get; set; }
        public ApiOkPagedResponse(ResultList pagedList, ResultMetaData metadata)
        {
            PagedList = pagedList;
            MetaData = metadata;
        }
    }
}
