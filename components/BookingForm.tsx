"use client";

import { useState, type FormEvent } from "react";

type Props = {
	projectTypes: string[];
	surveySlots: string[];
	/** POST /api/public/booking-request của trang quản trị; null khi chưa cấu hình ADMIN_API_URL. */
	endpoint: string | null;
	hotline: string | null;
};

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "phone" | "projectType" | "surveySlot" | "note", string[]>>;

const NAME_MAX = 100;
const NOTE_MAX = 1000;

export default function BookingForm({ projectTypes, surveySlots, endpoint, hotline }: Props) {
	const [status, setStatus] = useState<Status>("idle");
	const [message, setMessage] = useState("");
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const callHint = hotline ? ` Bạn có thể gọi hotline ${hotline} để được hỗ trợ ngay.` : "";

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (status === "submitting") return;

		const form = e.currentTarget;
		const data = new FormData(form);
		const field = (key: string) => String(data.get(key) ?? "").trim();

		setFieldErrors({});
		setMessage("");

		if (!endpoint) {
			setStatus("error");
			setMessage(`Hiện chưa thể gửi yêu cầu trực tuyến.${callHint}`);
			return;
		}

		setStatus("submitting");
		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: field("name"),
					phone: field("phone"),
					projectType: field("projectType"),
					surveySlot: field("surveySlot"),
					note: field("note") || undefined,
					website: field("website"), // ô ẩn chống spam, người thật luôn để trống
				}),
			});
			const body = (await res.json().catch(() => null)) as {
				ok?: boolean;
				code?: string;
				fieldErrors?: FieldErrors;
				retryAfterSeconds?: number;
			} | null;

			if (res.ok && body?.ok) {
				form.reset();
				setStatus("success");
				setMessage("Đã nhận yêu cầu. Đội thiết kế sẽ liên hệ trong 24 giờ để hẹn thời gian khảo sát.");
				return;
			}

			setStatus("error");
			if (body?.code === "VALIDATION") {
				setFieldErrors(body.fieldErrors ?? {});
				setMessage("Vui lòng kiểm tra lại thông tin bên dưới.");
			} else if (body?.code === "RATE_LIMITED") {
				const minutes = Math.max(1, Math.ceil((body.retryAfterSeconds ?? 600) / 60));
				setMessage(`Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau khoảng ${minutes} phút.${callHint}`);
			} else {
				setMessage(`Không gửi được yêu cầu lúc này.${callHint}`);
			}
		} catch {
			setStatus("error");
			setMessage(`Không kết nối được máy chủ.${callHint}`);
		}
	}

	const errorOf = (key: keyof FieldErrors) => fieldErrors[key]?.[0];
	const submitting = status === "submitting";

	return (
		<form onSubmit={onSubmit} noValidate>
			<div className="row2">
				<div className="field">
					<label htmlFor="f-name">Họ tên</label>
					<input
						id="f-name"
						name="name"
						type="text"
						placeholder="Nguyễn Văn A"
						required
						maxLength={NAME_MAX}
						autoComplete="name"
						aria-invalid={Boolean(errorOf("name"))}
					/>
					{errorOf("name") && <span className="field-error" role="alert">{errorOf("name")}</span>}
				</div>
				<div className="field">
					<label htmlFor="f-phone">Số điện thoại</label>
					<input
						id="f-phone"
						name="phone"
						type="tel"
						placeholder="090 xxx xxxx"
						required
						autoComplete="tel"
						aria-invalid={Boolean(errorOf("phone"))}
					/>
					{errorOf("phone") && <span className="field-error" role="alert">{errorOf("phone")}</span>}
				</div>
			</div>
			<div className="row2">
				<div className="field">
					<label htmlFor="f-type">Loại hình</label>
					<select id="f-type" name="projectType" defaultValue={projectTypes[0]}>
						{projectTypes.map((type) => (
							<option key={type}>{type}</option>
						))}
					</select>
					{errorOf("projectType") && <span className="field-error" role="alert">{errorOf("projectType")}</span>}
				</div>
				<div className="field">
					<label htmlFor="f-time">Khung giờ khảo sát</label>
					<select id="f-time" name="surveySlot" defaultValue={surveySlots[0]}>
						{surveySlots.map((slot) => (
							<option key={slot}>{slot}</option>
						))}
					</select>
					{errorOf("surveySlot") && <span className="field-error" role="alert">{errorOf("surveySlot")}</span>}
				</div>
			</div>
			<div className="field">
				<label htmlFor="f-note">Ghi chú (không bắt buộc)</label>
				<textarea id="f-note" name="note" rows={2} maxLength={NOTE_MAX} placeholder="Ví dụ: gọi trước 30 phút" />
				{errorOf("note") && <span className="field-error" role="alert">{errorOf("note")}</span>}
			</div>

			{/* Honeypot: ẩn khỏi người dùng và trình đọc màn hình; bot điền vào sẽ bị Admin bỏ qua. */}
			<div className="hp-field" aria-hidden="true">
				<label htmlFor="f-website">Website</label>
				<input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
			</div>

			<button className="btn btn-primary" style={{ width: "100%", marginTop: ".3rem" }} type="submit" disabled={submitting}>
				{submitting ? "Đang gửi…" : "Gửi yêu cầu tư vấn"}
			</button>

			<p
				className={`form-status${status === "success" ? " is-success" : ""}${status === "error" ? " is-error" : ""}`}
				role={status === "error" ? "alert" : "status"}
			>
				{message}
			</p>
		</form>
	);
}
