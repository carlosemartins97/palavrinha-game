import { Component, OnInit } from '@angular/core';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../game.service';
import { Stats, StatsService } from '../game/stats.service';

@Component({
  selector: 'app-modal-instrucoes',
  templateUrl: './modal-instrucoes.component.html',
  styleUrls: ['./modal-instrucoes.component.scss']
})
export class ModalInstrucoesComponent implements OnInit {

  faCircleQuestion = faCircleQuestion;
  

  constructor(private modalService: NgbModal, private config: NgbModalConfig) { 
    config.modalDialogClass = 'modal-instrucoes';
  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-instrucoes'}).result;
  }

}
