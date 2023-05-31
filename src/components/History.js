import React from 'react';
import Col from 'react-bootstrap/Col';

const History = () => {

    return (
        <Col>
            <table class="table table-striped">
                <thead class="text-center">
                    <tr>
                        <th scope="col"><h4>#</h4></th>
                        <th scope="col"><h4>เวลาแทง</h4></th>
                        <th scope="col"><h4>ตลาด</h4></th>
                        <th scope="col"><h4>รายการ</h4></th>
                        <th scope="col"><h4>บาท</h4></th>
                        <th scope="col"><h4>หมายเหตุ</h4></th>
                        <th scope="col"><h4>ลบโพย</h4></th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr>
                        <td colspan="7">❌ ยังไม่เปิดใช้งาน ❌</td>
                    </tr>
                </tbody>
            </table>
        </Col>
    );
}

export default History;
