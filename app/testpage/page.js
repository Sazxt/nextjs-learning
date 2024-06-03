import Sidebar from "./components/sidebars";
import "./css/style.css"
import "./css/bootstrap.min.css"
import "./css/blue-color.css"

export default function Testpage(){
    return (
        <>
            <Sidebar/>
            <div class="col-lg-3 col-6 col-xs-12">
                <div class="dashboard-top-box rounded-bottom panel-bg">
                    <div class="left">
                        <h3>$34,152</h3>
                        <p>Shipping fees are not</p>
                        <a href="#">View net earnings</a>
                    </div>
                    <div class="right">
                        <span class="text-primary">+16.24%</span>
                        <div class="part-icon rounded">
                            <span><i class="fa-light fa-dollar-sign"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <h1>HI hello world</h1>
        </>
    );
}