import React, { Component } from 'react'

export default class AddCategoria extends Component {
  render() {
    return (
        <div className='container-fluid'>
        <div className='row mt-4'>
            <div className='col'></div>
            <div className='col-8'>
                <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Título</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Duración</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" class="btn btn-primary">Añadir</button>
                </form>
            </div>
            <div className='col'></div>
        </div>
      </div>
    )
  }
}
