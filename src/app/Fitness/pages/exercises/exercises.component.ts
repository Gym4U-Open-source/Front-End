import { Component, OnInit, ViewChild } from '@angular/core'; // ViewChild -> for table func
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddExerciseDialogComponent } from '../components/add-exercise-dialog/add-exercise-dialog.component';
import { ExercisesService } from '../../services/exercises.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  title = '05_crud_api_material_ui';
  totalData!: number;

  displayedColumns: string[] = [
    'Exerxises',
    'Tags',
    'Primary Focus',
    'Category',
    'Custom',
    'Actions'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ExercisesService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog
      .open(AddExerciseDialogComponent, {
        width: '432px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalData = res.length
      },
      error: (err) => {
        console.log('Error while fetching the Records!!');
      },
    });
  }

  editProduct(row: any) {
    this.dialog
      .open(AddExerciseDialogComponent, {
        width: '432px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProducts();
        }
      });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        console.log('Exercise deleted successfully.');
        this.getAllProducts();
      },
      error: (err) => {
        console.log('Something went while deleting');
      },
    });
  }
}

// ExercisesComponent
