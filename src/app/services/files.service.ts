import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private expresion = /[a-zA-Z]/;

  constructor(public _http: HttpClient) {
  }

  leerArchivo () {
    // lectura de archivo
    // return this._http.get('assets/input.txt', { responseType: 'text' });
    return this._http.get('assets/inicial.txt', { responseType: 'text' });
  }

  transponer(rows: number, columns: number, step:number, matrix: any) {
    let aux;

    aux = [columns];
    for (let i = 0; i < columns; i++){
      aux[i] = [rows];
    }

    for(let i=0; i<columns; i++){
      for(let j=1; j<=rows; j++){
        aux[i][j] = matrix[j][i];
      }
    }

    return aux;
  }

  getCapas(trans: any) {
    let capas: any = [];
    let uniques: any = [];

    for (let i = 0; i < trans.length; i++) {
      for (let j = 1; j <= trans[i].length; j++) {
        let capa = trans[i][j];
        if ( capa !== "" && capa !== undefined) {
          capas.push(capa);
        }
      }
    }

    let flags = {};
    uniques = capas.filter( (item, index, lista) => {
      let letra = item.trim();
      if ( flags[letra] ) {
        return false;
      }
      flags[letra] = true;
      return true;
    });

    return uniques;
  }

  getCoordenadas(trans: any, capas: any, paso:number) {
    let coords: any = [];
    console.log(`capas: ${capas}`);
    console.log(`paso: ${paso}`);

    for (let c = 0; c < capas.length; c++) {
      let x1: number = 0;
      let x2: number = 0;
      let y1: number = 0;
      let y2: number = 0;

      for (let i = 0; i < trans.length; i++) {
        for (let j = 1; j <= trans[i].length; j++) {
          if (trans[i][j] !== '' && trans[i][j] !== undefined && capas[c] === trans[i][j] ) {

            x1 = trans[i].length;
            y1 = trans.length;

            x2 = 0;
            y2 = 0;
          }
        }
      }

      for (let i = 0; i < trans.length; i++) {
        for (let j = 1; j <= trans[i].length; j++) {
          if (trans[i][j] !== '' && trans[i][j] !== undefined && capas[c] === trans[i][j] ) {

            x1 = ((j-1)<x1) ? (j-1) : x1;
            y1 = (i<y1) ? i : y1;

            x2 = ((j-1)>x2) ? (j-1) : x2;
            y2 = (i>y2) ? i : y2;
          }
        }
      }

      let px = ( (x1 * paso) + ((x2 +1) * paso) ) / 2;
      let py = ( (y1 * paso) + (y2 * paso) ) / 2;

      coords.push({
        W: capas[c],
        Px: px.toFixed(3),
        Py: py.toFixed(3),
        x1,
        x2,
        y1,
        y2
      });
    }

    return coords;
  }
}
