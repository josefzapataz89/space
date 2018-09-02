import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {
  public configuraciones: any;
  public lectura_radar: any;
  // tslint:disable-next-line:member-ordering
  private expresion = /[a-zA-Z]/;
  private lineas: any;

  constructor(public _file: FilesService) { }

  ngOnInit() {
    this.mostrar();
  }

  async mostrar() {
    let row: number = 1;
    this.lectura_radar = [];
    this.configuraciones = [];

    let data = await this._file.leerArchivo().subscribe((data: any) => {
      let lineas = data.split('\n');
      let ships = lineas[0];

      for (let i = 0; i < ships; i++) {
        let config = (lineas[row]).split(' ');
        this.configuraciones[i] = config;
        this.lectura_radar[i] = [Number(config[0])];

        let x_axis = [];

        for (let j = 0; j <= Number(config[0]); j++) {
          this.lectura_radar[i][j] = [Number(config[1])];
          let info = lineas[(row + j)].split(' ');
          let y_axis = [];

          for (let k = 0; k < info.length; k++) {
            y_axis.push((info[k].match(this.expresion)) ? info[k] : '');
          }

          x_axis.push(y_axis);
        }
        this.lectura_radar[i] = x_axis;

        row += Number(config[0]) + 1;
        // console.log(`nave ${i + 1}`, this.response[i]);
      }

      this.listar();
    });
  }

  listar () {
    // let matrix = [this.lectura_radar.length];
    let trans:any;
    let capas:any;
    let coordenadas:any;
    let matrix:any = [];
    let config:any = [];

    for (let _n = 0; _n < this.lectura_radar.length; _n++) {

      config = this.configuraciones[_n];
      for (let _i = 1; _i < this.lectura_radar[_n].length; _i++) {
        matrix[_i] = this.lectura_radar[_n][_i];
      }

      trans = this._file.transponer(config[0], config[1], config[2], matrix);
      capas = this._file.getCapas(trans);
      coordenadas = this._file.getCoordenadas(trans, capas, this.configuraciones[_n][2]);

      let cadena = '';

      let respuesta = coordenadas.map((nave, index) => {
        console.log(`nave ${index} coords: `, nave);
        return `${nave.W}:${nave.Px},${nave.Py}`;
      });
      console.log(`cadena `, respuesta.join(' '));
      // break;
    }

  }

}
