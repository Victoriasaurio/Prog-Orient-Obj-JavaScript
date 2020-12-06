//Logica de la interfaz
class Product {
    //Crea un objeto cuando este es llamado
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    //Método para agregar el producto al HTML
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div'); //Permite preparar-diseñar los datos para mostrarlos en pantalla.
        element.innerHTML = ` 
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product name</strong>: ${product.name}
                    <strong>Product price</strong>: ${product.price}
                    <strong>Product year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger mx-2" type="button" name="delete">Delete</a>
                </div>
            </div>
        `
            //innerHTML se encarga de diseñar el guardado de datos.
        productList.appendChild(element); //Muestra en pantalla los valores diseñados.
    }

    resetForm() {
        document.getElementById('product-form').reset(); //Limpia el formulario
    }

    /**parentElement permite acceder a las capas existentes
     * Elemplo: target(a), target(strong), target(div)
     */
    deleteProduct(element) {
            if (element.name === 'delete') {
                element.parentElement.parentElement.parentElement.remove(); //Elimina la targeta
            }
        }
        /**Dos parámetros el mensaje
         * cssClass, indicará un mensaje de ERROR | SUCCESS
         */
    showMessage(message, cssClass) {
        const div = document.createElement('div'); //Creación del elemento div para ser usado en el mensaje
        div.className = ` alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message)); //Se crea un hijo que almacena el mensaje
        //Mostrando en el DOM
        const container = document.querySelector('.container'); //Selecciona todo el contenedor para que el mensaje aparezca en la parte de arriba del mismo
        const app = document.querySelector('#app');
        container.insertBefore(div, app); //Inserta el div(message) creado antes del contenido-app
        //.alert, hace referencia a las propiedades que empiecen con alert
        setTimeout(function() {
            document.querySelector('.alert').remove(); //Elimina la alerta después de 2 seg
        }, 2000)
    }
}

//DOM Events - Accciones dentro de la interfaz

//Captura el submit del formulario.
document.getElementById('product-form')
    .addEventListener("submit", function(e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, year);
        const ui = new UI(); //Creación de una nueva instancia

        /**En lugar de un else puede ser un 'return', esto permite finalizar la acción y evitar que continue*/

        if (name === '' || price === '' || year === '') {
            ui.showMessage('Complete fields please', 'danger'); //parámetros: mensaje, colorMensaje
        } else {
            ui.addProduct(product); //Utiliza los valores para agregarlos a la pantalla
            ui.resetForm(); //Limpia el formulario

            //Captura el Message SUCCESS
            ui.showMessage('Product saved successfully', 'success');
        }

        e.preventDefault(); //Cancela el refresh de la página | e = evento
    });

//Captura el delete del formulario 
/**click, ayudar a obtener información dependiendo de donde se realizó el click, información que otorgará dentro de la targeta product-list
 * id="product-list"
 */
document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target); //Evento obtenido dentro de la targeta product-list

    //Captura el Message ERROR
    ui.showMessage('Product deleted', 'warning');
})
