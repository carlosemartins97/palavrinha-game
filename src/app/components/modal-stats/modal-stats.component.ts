import { Component, OnInit } from '@angular/core';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../game.service';
import { Stats, StatsService } from '../game/stats.service';


@Component({
  selector: 'app-modal-stats',
  templateUrl: './modal-stats.component.html',
  styleUrls: ['./modal-stats.component.scss']
})
export class ModalStatsComponent implements OnInit {

  faChartSimple = faChartSimple;
  level: number;
  stats: Stats;

  constructor(private modalService: NgbModal, private config: NgbModalConfig, private gameService: GameService, private statsService: StatsService) { 
    config.modalDialogClass = 'modal-stats';
  }

  ngOnInit(): void {
    this.level = this.gameService.getLevel();
    this.stats = this.statsService.getStats();
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

}
