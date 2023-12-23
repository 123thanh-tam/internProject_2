import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig
    ) { }
    ngOnInit() {
        this.configPrimeng();
    }
    configPrimeng() {
        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation({
            firstDayOfWeek: 0,
            dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
            dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            monthNames: [
                'Tháng 01',
                'Tháng 02',
                'Tháng 03',
                'Tháng 04',
                'Tháng 05',
                'Tháng 06',
                'Tháng 07',
                'Tháng 08',
                'Tháng 09',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
            ],
            monthNamesShort: [
                'Th 1',
                'Th 2',
                'Th 3',
                'Th 4',
                'Th 5',
                'Th 6',
                'Th 7',
                'Th 8',
                'Th 9',
                'Th 10',
                'Th 11',
                'Th 12',
            ],
            today: 'Hôm nay',
            clear: 'Xóa',
            dateFormat: 'dd/mm/yy',
            weekHeader: 'Tuần',
            weak: "mật khẩu yếu",
            medium: "mật khẩu trung bình",
            strong: "mật khẩu mạnh"
        });
    }
}
