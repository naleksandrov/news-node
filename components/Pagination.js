module.exports = class Pagination {

	constructor(newsCount, activePage, maxRows, url, params = '') {
		let last = Math.ceil(newsCount/maxRows);
		let pageNum = activePage;
		let paginationCtrls = '';

		if(last < 1){
			last = 1;
		}

		if (pageNum < 1) {
			pageNum = 1;
		} else if (pageNum > last) {
			pageNum = last;
		}

		if(last !== 1) {
			if (pageNum > 1) {
				let previous = pageNum - 1;
				paginationCtrls += `<li><a href="${url}${previous}${params}"><span aria-hidden="true">&laquo;</span></a></li>`;

				for(let i = pageNum - 2; i < pageNum; i++) {
					if(i > 0){
						paginationCtrls += `<li><a href="${url}${i}${params}">${i}</a></li>`;
					}
				}
			}

			paginationCtrls += `<li class="active"><a href="javascript:;">${pageNum}</li>`;

			for(let i = pageNum + 1; i <= last; i++) {
				paginationCtrls += `<li><a href="${url}${i}${params}">${i}</a></li>`;
				if(i >= pageNum + 2){
					break;
				}
			}

			if (pageNum !== last) {
				let next = pageNum + 1;
				paginationCtrls += `<li><a href="${url}${next}${params}"><span aria-hidden="true">&raquo;</span></a></li>`;
			}
		}
		paginationCtrls = `<ul class="pagination">${paginationCtrls}</ul>`;


		this.pagination = paginationCtrls;
	}
};
