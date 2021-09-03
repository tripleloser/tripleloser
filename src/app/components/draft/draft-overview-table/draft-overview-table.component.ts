import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DraftPick } from 'src/app/models/draftPick.model';
import { DraftOverviewTableModel } from './draft-overview-table.model';

@Component({
  selector: 'app-draft-overview-table',
  templateUrl: './draft-overview-table.component.html',
  styleUrls: ['./draft-overview-table.component.scss']
})
export class DraftOverviewTableComponent implements OnInit, AfterViewInit {

  @Input() picksOfDrafts: DraftPick[][];
  @Input() leagueNames: Map<string,string>;

  displayedColumns: string[] = [
    'name',
    'picked',
    'adp',
    'firstPicked',
    'lastPicked',
    'differencePicked',
    'listPicked',
  ];
  dataSource: MatTableDataSource<DraftOverviewTableModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor() {
    this.dataSource = new MatTableDataSource<DraftOverviewTableModel>([]);
  }

  ngOnInit(): void {
    this.createData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item: DraftOverviewTableModel, property: string) => {
      switch(property) {
        case 'name': return item.draftPicks[0].metadata.first_name + item.draftPicks[0].metadata.last_name
        case 'picked': return item.stats.picked
        case 'firstPicked': return item.stats.firstPick
        case 'lastPicked': return item.stats.lastPick
        case 'differencePicked': return item.stats.differencePicked
        case 'adp': return item.stats.adp
        default: return undefined;
      }
    };
    this.dataSource.sort = this.sort;

  }

  createData(): void {
    const data: DraftOverviewTableModel[] = [];

    this.picksOfDrafts.forEach((draftPicks: DraftPick[]) => {
      draftPicks.forEach((draftPick: DraftPick) => {
        const itemFound = data.find((d: DraftOverviewTableModel) => d.playerId === draftPick.player_id);
        if (itemFound === undefined) {
          data.push({
            playerId: draftPick.player_id,
            draftPicks: [draftPick],
            stats: {},
          });
        } else {
          itemFound.draftPicks.push(draftPick);
        }
      });
    });

    const lengthOfDrafts = this.picksOfDrafts.map(_ => _.length);

    data.forEach((row: DraftOverviewTableModel) => {
      row.stats.picked = row.draftPicks.length;
      const pickNumbers = row.draftPicks.map(_ => _.pick_no);
      
      row.stats.firstPick = Math.min(...pickNumbers);
      row.stats.lastPick =
        pickNumbers.length === this.picksOfDrafts.length ?
        Math.max(...pickNumbers) :
        Math.max(...lengthOfDrafts) + 1;
      row.stats.differencePicked = row.stats.lastPick - row.stats.firstPick;
      row.stats.adp = pickNumbers.reduce((sum, current) => sum + current, 0) / pickNumbers.length;
    });

    this.dataSource.data = data;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPickedInLeagues(row: DraftOverviewTableModel): string[] {
    const result: string[] = [];
    row.draftPicks.forEach((draftPick: DraftPick) => {
      result.push(`${this.getShortLeagueName(draftPick.draft_id)}: ${draftPick.pick_no} (Round ${draftPick.round}, Pick ${draftPick.draft_slot})`)
    });
    return result.sort();
  }

  getShortLeagueName(draftId: string): string {
    const name = this.leagueNames.get(draftId);
    return name.replace('Chefkochs Super League ', '');
  }

}
