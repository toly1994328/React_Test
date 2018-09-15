import React, {Component} from 'react';
import './FlexBox.scss'
import Q from "../static/js/toly-libs/Q";

const $ = window.$;
new Q($);

class FlexBox extends Component {

    render() {
        return (
            <div>
                <h1>Flex布局测试页</h1>

                <div className="flex-container">
                    <div className="item1">我是--1</div>
                    <div className="item2">我是--2</div>
                    <div className="item3">我是--3</div>
                </div>

                <div className="select">
                    <div className="item">flex-direction
                        <div className="s1"></div>
                    </div>
                    <div className="item">flex-wrap
                        <div className="s4"></div>
                    </div>


                    <div className="item">
                        justify-content
                        <div className="s2"></div>
                    </div>
                    <div className="item">
                        align-items
                        <div className="s3"></div>
                    </div>

                </div>

                <div className="ranger">
                    <div className="warpper">
                        <p id="flex-grow" className="card">2--的flex-grow：</p>
                        <input type="range" defaultValue="0" id="range"/>
                    </div>
                    <div className="warpper">
                        <p id="flex-grow2" className="card">3--的flex-grow：</p>
                        <input type="range" defaultValue="0" id="range2"/>
                    </div>
                </div>

            </div>
        )
    }

    componentDidMount() {
        let $s1 = $(".s1").createSelect(["row", "row-reverse", "column", "column-reverse"]);
        $s1.on("input", function () {
            let value = ($(this).val());
            $(".flex-container").css({
                flexDirection: value
            })
        });

        let $s2 = $(".s2").createSelect(["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]);
        $s2.on("input", function () {
            let value = ($(this).val());
            $(".flex-container").css({
                justifyContent: value
            })
        });


        let $s3 = $(".s3").createSelect(["stretch", "flex-start", "flex-end", "center", "baseline", "space-evenly"]);
        $s3.on("input", function () {
            let value = ($(this).val());
            $(".flex-container").css({
                alignItems: value
            })
        });

        let $s4 = $(".s4").createSelect(["nowrap", "wrap", "wrap-reverse"]);
        $s4.on("input", function () {
            let value = ($(this).val());
            $(".flex-container").css({
                flexWrap: value
            })
        });


        let $range = $('#range');
        $range.on('change input', function (e) {//监听改变和输入事件
            let value = $(this).val();
            $('#flex-grow').text("2--的flex-grow：" + value / 100);
            $(".item2").css("flexGrow", value / 100)
        });

        let $range2 = $('#range2');
        $range2.on('change input', function (e) {//监听改变和输入事件
            let value = $(this).val();
            $('#flex-grow2').text("3--的flex-grow：" + value / 100);
            $(".item3").css("flexGrow", value / 100)
        });

        $range.width(600);
        $range2.width(600);

        selectCss($s1);
        selectCss($s2);
        selectCss($s3);
        selectCss($s4);

        function selectCss($el) {
            $el.css({
                fontSize: 20,
                backgroundColor: '#9CB6FC',
                color: "#fff",
                padding: 10,
                border: null
            });
        }
    }
}

export default FlexBox;