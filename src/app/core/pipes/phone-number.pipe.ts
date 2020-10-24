import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(tel: any, args?: any): any {
    if (!tel || tel.match(/[^0-9]/)) {
      return tel;
    }

    let country, region, number;

    switch (tel.length) {
      case 10:
        country = '+7';
        region = tel.slice(0, 3);
        number = tel.slice(3);
        break;

      default:
        return tel;
    }
    // format ##-##-###
    number = number.slice(0, 3) + '-' + number.slice(3, 5) + '-' + number.slice(5);
    // format +C (PPP) ##-##-###
    return (country + ' (' + region + ') ' + number);
  }

}
