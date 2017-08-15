import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterStatus'
})
export class DevicesFilter implements PipeTransform {

  transform (items: any[], filter: Object): object[] {
    // Filter SHOW ALL
    if (filter === 'all') {
      return items;
    }
    // Filter ON LINE
    else if(filter === 'online'){
      return items.filter((item) => {
        return item.info.client_id !== null;
      })
    }
    // Filter OFF LINE
    else if (filter === 'ofline') {
      return items.filter((item) => {
        return item.info.client_id === null;
      })
    }
    // Sahrch by device name
    else {
      return items.filter((item) => {
        return item.d.myName === filter;
      })
    }
  }

}
