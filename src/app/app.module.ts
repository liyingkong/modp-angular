import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LightboxModule} from 'primeng/lightbox';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { MenuModule, DropdownModule,EditorModule, InputSwitchModule, StepsModule, AccordionModule, DataTableModule, SplitButtonModule, SharedModule, GrowlModule, ConfirmDialogModule, ConfirmationService, DataGridModule, PanelModule, InputTextModule, ButtonModule, DialogModule, DataListModule, SpinnerModule, FileUploadModule, SelectButtonModule,} from 'primeng/primeng'
import {TabMenuModule} from 'primeng/tabmenu';
import {ChartModule} from 'primeng/chart';
// import {ToastModule} from 'primeng/component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/components/common/messageservice';
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
// import { t_peoplefeatureService } from './shared/t_peoplefeature.service';
// import { FaceListComponent } from './face-list/face-list.component';
import { DisplayComponent } from "./display/display.component";
import { t_peoplecontroltypeService } from './shared/t_peoplecontroltype.service';
import { UploadService } from './shared/upload.service';
import { CutVideoParamService } from './shared/CutVideoParam.service';
import { NgxEchartsModule } from "ngx-echarts";
// import { SearchProComponent } from './search-pro/search-pro.component';
// import { SearchProByImageService } from './shared/image_file_search.service';

@NgModule({
  declarations: [
    IndexComponent,
    AppComponent,
    // FaceListComponent,
    // SearchProComponent,
    DisplayComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    //HttpModule,

    NgxEchartsModule,
    ChartModule,
    MenuModule,
    TabMenuModule,
    StepsModule,
    DataTableModule,
    SharedModule,
    SplitButtonModule,
    GrowlModule,
    DataGridModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    DataListModule,
    SpinnerModule,
    AccordionModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    SelectButtonModule,
    OverlayPanelModule,
    LightboxModule,
    

    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [

    MessageService,
    ConfirmationService,
    // t_peoplefeatureService,
    // SearchProByImageService,
    t_peoplecontroltypeService,
    UploadService,
    CutVideoParamService,
    //有顺序，自上向下增加

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

