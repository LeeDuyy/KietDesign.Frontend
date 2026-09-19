"use client";

export default function BookingForm() {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div className="row2">
				<div className="field">
					<label htmlFor="f-name">Họ tên</label>
					<input id="f-name" type="text" placeholder="Nguyễn Văn A" />
				</div>
				<div className="field">
					<label htmlFor="f-phone">Số điện thoại</label>
					<input id="f-phone" type="tel" placeholder="090 xxx xxxx" />
				</div>
			</div>
			<div className="row2">
				<div className="field">
					<label htmlFor="f-type">Loại hình</label>
					<select id="f-type" defaultValue="Căn hộ">
						<option>Căn hộ</option>
						<option>Nhà phố</option>
						<option>Biệt thự</option>
						<option>Khác</option>
					</select>
				</div>
				<div className="field">
					<label htmlFor="f-time">Khung giờ khảo sát</label>
					<input id="f-time" type="text" placeholder="Cuối tuần, buổi tối..." />
				</div>
			</div>
			<button className="btn btn-primary" style={{ width: "100%", marginTop: ".3rem" }} type="submit">
				Gửi yêu cầu tư vấn
			</button>
		</form>
	);
}
