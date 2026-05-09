import { Card } from '../components/Card';
import './Admin.css';

export function Admin() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Quản Lý Hệ Thống</h2>
        <p>Quản lý các thiết lập và quyền hạn hệ thống</p>
      </div>

      <div className="admin-grid">
        <Card title="Quản Lý Cử Nhân" className="admin-card">
          <div className="card-description">
            Thêm, xóa, hoặc sửa đổi các cử nhân và quyền của họ
          </div>
          <button className="btn-admin">Quản Lý Cử Nhân</button>
        </Card>

        <Card title="Quản Lý Đề Xuất" className="admin-card">
          <div className="card-description">
            Tạo, xóa, hoặc kích hoạt/vô hiệu hóa các đề xuất
          </div>
          <button className="btn-admin">Quản Lý Đề Xuất</button>
        </Card>

        <Card title="Quản Lý Vai Trò" className="admin-card">
          <div className="card-description">Gán hoặc thay đổi vai trò người dùng</div>
          <button className="btn-admin">Quản Lý Vai Trò</button>
        </Card>

        <Card title="Nhật Ký Hành Động" className="admin-card">
          <div className="card-description">Xem lịch sử tất cả các hoạt động</div>
          <button className="btn-admin">Xem Nhật Ký</button>
        </Card>
      </div>

      <Card title="Cài Đặt Hệ Thống" className="settings-card">
        <div className="settings-section">
          <div className="setting-item">
            <div className="setting-label-group">
              <label className="setting-label">Thời Gian Bầu Mặc Định (Ngày)</label>
              <p className="setting-description">
                Thời gian mặc định cho mỗi vòng bầu cử
              </p>
            </div>
            <input type="number" className="setting-input" value="7" />
          </div>

          <div className="setting-item">
            <div className="setting-label-group">
              <label className="setting-label">Quorum Tối Thiểu (%)</label>
              <p className="setting-description">
                Tỷ lệ phần trăm tối thiểu phải tham gia để có hiệu lực
              </p>
            </div>
            <input type="number" className="setting-input" value="50" />
          </div>

          <div className="setting-item">
            <div className="setting-label-group">
              <label className="setting-label">Yêu Cầu Số Phiếu Đồng Ý (%)</label>
              <p className="setting-description">
                Tỷ lệ phần trăm phiếu đồng ý cần để phê duyệt đề xuất
              </p>
            </div>
            <input type="number" className="setting-input" value="66" />
          </div>

          <div className="setting-item">
            <div className="setting-label-group">
              <label className="setting-label">Cho Phép Ủy Thác</label>
              <p className="setting-description">
                Cho phép người dùng ủy thác quyền bầu
              </p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={true} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <button className="btn-save-settings">Lưu Cài Đặt</button>
      </Card>
    </div>
  );
}
