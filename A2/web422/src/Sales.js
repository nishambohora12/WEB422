import React from "react";
import { withRouter } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
class Sales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: [], currentPage: 1
        }
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    getData(page)
     {
        fetch(`https://pacific-journey-04027.herokuapp.com/api/sales/?page=${page}&perPage=10`).then((res) => {
            return res.json();
        }).then((saleJson) => {
            this.setState({ sales: saleJson });
        });
    }

    componentDidMount() 
    {
        this.setState(this.getData(this.state.currentPage));
    }

    previousPage()
     {
        if (this.state.currentPage > 1) {
            this.getData(this.state.currentPage - 1);
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    nextPage()
     {
        this.getData(this.state.currentPage + 1);
        this.setState({ currentPage: this.state.currentPage + 1 });
    }

    render()
     {
        if (this.state.sales.length > 0) 
        {
            return (
                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map((saleData) => (
                                <tr key={saleData._id} onClick={() => { this.props.history.push(`/Sale/${sale._id}`) }}>
                                    <td>{saleData.customer.email}</td>
                                    <td>{saleData.storeLocation}</td>
                                    <td>{saleData.items.length}</td>
                                    <td>{new Date(saleData.saleDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.previousPage} />
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.nextPage} />
                    </Pagination>
                </div>
            );
        } else {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        }
    }
}
export default withRouter(Sales);