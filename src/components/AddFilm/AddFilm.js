import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import AddIcon from "../../assets/AddIcon.png";

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
}

export default class Avatar extends React.Component {
	state = {
		loading: false,
	};

	handleChange = (info) => {
		if (info.file.status === "uploading") {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (imageUrl) =>
				this.setState({
					imageUrl,
					loading: false,
				})
			);
		}
	};

	render() {
		const { loading, imageUrl } = this.state;
		const uploadButton = (
			<div className="iconAndText">
				{loading ? (
					<LoadingOutlined />
				) : (
					<img src={AddIcon} alt="add Icon" className="icon"></img>
				)}
				<div className="addTitle" style={{ marginTop: 8 }}>
					AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ
				</div>
			</div>
		);
		if (loading) {
			return <ProgressBar />;
		} else {
			return (
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					beforeUpload={beforeUpload}
					onChange={this.handleChange}
				>
					{imageUrl ? (
						<img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
					) : (
						uploadButton
					)}
				</Upload>
			);
		}
	}
}
