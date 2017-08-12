import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterStatus'
})
export class DevicesFilter implements PipeTransform {
    transform(items: any[], filter: Object): any {

        if(filter === 'online'){
          return items.filter((item) => {
            return item.info.client_id !== null
          })
        }else if(filter === 'ofline'){
          return items.filter((item) => {
            return item.info.client_id === null
          })
        }else if(filter === 'all'){
          return items;
        }else{
          return items.filter((item) => {
            return item.d.myName === filter
          })
        }
    }
}
