import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ValidationMessageComponent } from './validation-message.component';

@NgModule({
  imports: [CommonModule, MessagesModule, MessageModule],
  declarations: [ValidationMessageComponent],
  exports: [ValidationMessageComponent],
})
export class ValidationMessagedModule {}
