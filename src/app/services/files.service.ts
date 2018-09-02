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
    return this._http.get('assets/otros.txt', { responseType: 'text' });
    // return this._http.get('assets/inicial.txt', { responseType: 'text' });
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
      for (let j = 1; j < trans[i].length; j++) {
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

    for (let c = 0; c < capas.length; c++) {
      let x: any = [];
      let y: any = [];
      let x1: number = 0;
      let x1: number = 0;
      let x2: number = 0;
      let y1: number = 0;
      let y2: number = 0;

      let contador = getVeces(capas[c], trans);

      for (let i = 0; i < trans.length; i++) {
        for (let j = 1; j < trans[i].length; j++) {
          if (trans[i][j] !== '' && trans[i][j] !== undefined && capas[c].trim() === trans[i][j].trim() ) {

            x1 = trans[i].length;
            y1 = trans.length;

            x2 = 0;
            y2 = 0;
          }
        }
      }

      for (let i = 0; i < trans.length; i++) {
        for (let j = 1; j < trans[i].length; j++) {
          if (trans[i][j] !== '' && trans[i][j] !== undefined && capas[c].trim() === trans[i][j].trim() ) {
            x1 = ((j - 1) < x1) ? (j - 1) : x1;
            y1 = (i < y1) ? i : y1;
            x2 = ((j - 1) > x2) ? (j - 1) : x2;
            y2 = (i > y2) ? i : y2;

            x.push(x1);
            x.push(x2);
            y.push(y1);
            y.push(y2);
          }
        }
      }

      x1 = Math.min(...x);
      x2 = Math.max(...x);
      y1 = Math.min(...y);
      y2 = Math.max(...y);

      let px = ( ((x1) * paso) + ((x2+1) * paso) ) / 2;
      let py = ( ((y1) * paso) + ((y2+1) * paso) ) / 2;
      let alto = (((y2 + 1) * paso) - ((y1) * paso) );
      let ancho = (((x2 + 1) * paso) - ((x1) * paso) );
      let area = alto * ancho;

      coords.push({
        W: capas[c].trim(),
        Px: px.toFixed(3),
        Py: py.toFixed(3),
        veces: contador,
        x1,
        x2,
        y1,
        y2,
        area: area.toFixed(3)
      });
    }

    coords.sort(descendente);

    return coords;
  }

  proximidad(trans: any, coordenadas: any) {
    console.log(`coordenadas: `, coordenadas);

    let capas: any = [];
    for ( let item of coordenadas) {
      capas.push(item.W);
    }

    adjunto(capas, trans);
  }

  function getVeces(capa: string, trans: any) {
    let contador: number = 0;

    for (let i = 0; i < trans.length; i++) {
      for (let j = 1; j < trans[i].length; j++) {
        if (trans[i][j] !== '' && trans[i][j] !== undefined && capa.trim() === trans[i][j].trim()) {
          contador++;
        }
      }
    }

    return contador;

  }

  function descendente(a, b) {
    let comparacion = 0;

    if (Number(b.area) > Number(a.area)) {
      comparacion = -1;
    }
    else if (a.area > Number(b.area)) {
      comparacion = 1;
    }

    return comparacion;
  }

  function adjunto ( capas: any, trans: any ) {
    let mat: any = [trans.length];
    let entrada: string = [];

    for (let capa of capas) {
      for (let i = 0; i < trans.length; i++) {
        mat[i] = [trans[i].length - 1];
        for (let j = 1; j < trans[i].length; j++) {
          if (trans[i][j].trim() === capa.trim()) {
            mat[i][j] = capa;
          }
          else {
            mat[i][j] = undefined;
          }
        }
      }
    }

    console.log(`matriz`, mat);
    console.log(`entradas`, entrada);

  }
}
