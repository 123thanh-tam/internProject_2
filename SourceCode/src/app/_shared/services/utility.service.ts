import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Timestamp, timestamp } from 'rxjs';

@Injectable()
export class UtilityService {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  isEmpty(input) {
    if (input == undefined || input == null || input == '') {
      return true;
    }
    return false;
  }


  navigate(path: string) {
    this._router.navigate([path]);
  }
  Unflattering = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    let node = {
      data: {
        Id: '',
        ParentId: '',
      },
      expanded: true,
      children: [],
    };
    for (let index = 0; index < arr.length; index += 1) {
      map[arr[index].Id] = index; // initialize the map
      arr[index].data = this.getAllProperties(arr[index]); // initialize the data
      arr[index].children = []; // initialize the children
    }
    for (let i = 0; i < arr.length; i += 1) {
      node = arr[i];
      if (node.data.ParentId !== null && arr[map[node.data.ParentId]] != undefined) {
        arr[map[node.data.ParentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };
  UnFlatForLeftMenu = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    for (let i = 0; i < arr.length; i += 1) {
      let node = arr[i];
      node.children = [];
      map[node.id] = i; // use map to look-up the parents
      if (node.parentId !== null) {
        delete node['children'];
        arr[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };

  MakeSeoTitle(input: string) {
    if (input == undefined || input == '') {
      return '';
    }
    //Đổi chữ hoa thành chữ thường
    let slug = input.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ''
    );
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, '-');
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
  }
  getDateFormatyyyymmdd(x) {
    let y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    d.length == 1 && (d = '0' + d);
    m.length == 1 && (m = '0' + m);
    let yyyymmdd = y + m + d;
    return yyyymmdd;
  }

  getAllProperties = (obj: object) => {
    const data = {};

    for (const [key, val] of Object.entries(obj)) {
      if (obj.hasOwnProperty(key)) {
        if (typeof val !== 'object') {
          data[key] = val;
        }
      }
    }
    return data;
  };
  convertDateToLocal = (date: Date | string | null) => {
    if (!date) return null;
    return new Date(date);
  };

  convertToRomanNumeral(number: number): string {
    const romanMap = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' },
    ];

    let roman = '';

    for (const r of romanMap) {
      while (number >= r.value) {
        roman += r.symbol;
        number -= r.value;
      }
    }

    return roman;
  }

  saveFile(base64: any, fileType: string, fileName: string) {
    let binaryString = window.atob(base64);
    let binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }

    const blob = new Blob([bytes], { type: fileType });

    const url = window.URL.createObjectURL(blob); // Tạo URL tạm thời

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url); // Xóa URL tạm thời
  }

  /**
   * disable controls
   * @param form FormGroup | FormArray
   * @param controlsName array string controls name
   * @returns
   */
  enableControls(form: AbstractControl, controlsName: string[]): void {
    controlsName.forEach(x => {
      let control = form.get(x);
      if (control) control.enable();
      else console.error('Could not enable control: ' + x);
    });
  }

  /**
   * disable controls
   * @param form FormGroup | FormArray
   * @param controlsName array string controls name
   * @returns
   */
  resetControls(form: AbstractControl, controlsName: string[]): void {
    controlsName.forEach(x => {
      let control = form.get(x);
      if (control) control.reset();
      else console.error('Could not reset control: ' + x);
    });
  }
  markAllControlsAsDirty(controls: AbstractControl[]): void {
    controls.forEach(control => {
      if (control instanceof FormControl) {
        (control as FormControl).markAsDirty({
          onlySelf: true,
        });
      } else if (control instanceof FormGroup) {
        this.markAllControlsAsDirty(Object.values((control as FormGroup).controls));
      } else if (control instanceof FormArray) {
        this.markAllControlsAsDirty((control as FormArray).controls);
      }
    });
  }
  convertTimestampToDate(timeStampe: any): Date {
    return new Date(+timeStampe.seconds * 1000); // because JS epoch times are milliseconds
  }
}
