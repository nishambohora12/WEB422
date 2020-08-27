/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Nisham Bohora Student ID: 154469183 Date: 2020/06/14
*
*
********************************************************************************/ 

let  saleData =[];
let page=1;
let perPage=10;

const saleTableTemplate = _.template(`
                                <% sales.forEach( function(data) { %>
                                    <tr data-id ='<%-data._id%>'> 
                                    <td><%- data.customer.email %></td>
                                    <td><%- data.storeLocation %></td>
                                    <td><%- data.items.length %></td>
                                    <td> <%- moment.utc(data.saleDate).local().format('LLLL') %></td>
                                    </tr>
                                <% }); %>
                            `);

 const saleModelBodyTemplate =_.template(`<%  
                                            %>
                                            <h4><strong>Customer</strong></h4>
                                            <strong>email: </strong> <%- customer.email %> <br>
                                            <strong>age: </strong> <%- customer.age %> <br>
                                            <strong>satisfaction: </strong> <%- customer.satisfaction %> / 5
                                            <br><br>
                                            <h4><strong> Items: $<%- obj.total.toFixed(2) %></strong></h4>
                                            <table class="table">
                                            <thead>
                                            <tr>
                                                <th> Product Name </th>
                                                <th> Quantity </th>
                                                <th> Price </th>                                                
                                            </tr> 
                                            </thead>                                            
                                            <tbody>                               
                                            <% _.forEach(obj.items, function(data) { %>
                                                <tr data-id=<%- data._id %>>
                                                    <td><%- data.name %></td>
                                                    <td><%- data.quantity %></td>
                                                    <td>$<%- data.price %></td>
                                                </tr>
                                            <% }); %>
                                            </tbody>                                            
                                            </table>
                                            <% 
                                           %>`);                         

function loadSaleData() {
    fetch(`https://pacific-journey-04027.herokuapp.com/api/sales?page=${page}&perPage=${perPage}`).then(res => res.json())
        .then(data => {
            saleData = data;
            $("#sale-table tbody").html(saleTableTemplate({ sales: data }));
            $("#current-page").html(page);
        });
}
$(document).ready(function () {
     
    loadSaleData();
    $("#previous-page").on("click", function () {
        if (page > 1) {
            page--;
        }
        loadSaleData();

    });
     $("#next-page").on("click", function () {
        page++;
        loadSaleData();

    });

    $("#sale-table tbody").on("click", "tr", function () {
        let clickedId = $(this).attr("data-id");
        let clickedSale = _.find(saleData, { '_id': clickedId });
        clickedSale.total = 0; 
        for (let i = 0; i < clickedSale.items.length; i++) { clickedSale.total += (clickedSale.items[i].price * clickedSale.items[i].quantity);}
        $("#sale-modal .modal-title").html(`<strong>Sale: ${clickedSale._id}</strong>`);
        $("#sale-modal .modal-body").html(saleModelBodyTemplate(clickedSale));
        $("#sale-modal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });



})