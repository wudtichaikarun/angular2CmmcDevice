import { Pipe, PipeTransform } from '@angular/core';
import { AppConstants } from './AppConstants';

@Pipe({
  name: 'filterStatus'
})
export class DevicesFilter implements PipeTransform {

  transform(items: any[], filter: Object): object[] {
    if (filter === AppConstants.FILTER_ALL) {
      return items;
    } else if (filter === AppConstants.FILTER_ONLINE) {
      return items.filter((item) => {
        return item.info.client_id !== undefined;
      });
    } else if (filter === AppConstants.FILTER_OFFLINE) {
      return items.filter((item) => {
        return item.info.client_id === undefined;
      });
    } else /* filter by device name */{
      return items.filter((item) => {
        return item.d.myName === filter;
      });
    }
  }

}
