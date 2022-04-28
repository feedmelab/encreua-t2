import styled, { keyframes } from "styled-components";

export const blink = keyframes`
	0%{ transform: scale( 1 ) }
	20%{ transform: scale( 1.15 ) }
	40%{ transform: scale( 1 ) }
	60%{ transform: scale( 1.1 ) }
	80%{ transform: scale( 1 ) }
	100%{ transform: scale( 1 ) }
`;
export const EnctContainer = styled.div`
	${
		"" /* display: flex;
	align-items: center;
	flex-direction: column;
	background-color: white;
	width: 89%;
	padding-bottom: 2rem;
	border-bottom-left-radius: 2rem;
	border-bottom-right-radius: 2rem;
	h2,
	h3,
	h4,
	h5,
	h6 {
		text-align: center;
	}
	p {
		text-align: center;
	}
	button {
		display: flex;
		font-size: 1rem;
		margin-top: 1rem;
		width: 100%;
		color: var(--btn-color);
		padding: 0.5rem;
		justify-content: center;
		border-radius: 0.5rem;
		background: linear-gradient(var(--btn-up), var(--btn-down));
		border-color: var(--border);
		text-shadow: 1px 1px rgb(0, 0, 80);
		font-family: "Varela Round", sans-serif;
	} */
	}
`;
export const EnctBox = styled.div`
	border: none;
	margin-bottom: 1rem;
	color: var(--textclar);
	border-radius: 0.5rem;
	background: var(--bg-container);
	padding: 0.3rem;
	display: flex;
	flex-direction: row;
	box-shadow: 0.1rem 0.05rem 0.32rem #444;
	img {
		dispay: flex;
		align-self: center;
		justify-self: center;
	}
`;
export const EnctBoxLoader = styled.div`
	border: 1px solid transparent;
	margin-bottom: 1rem;
	color: var(--textclar);
	border-radius: 0.5rem;
	background: var(--bg-container);
	padding: 0.6rem;
	display: flex;
	justify-content: center;
	img {
		width: auto;
		dispay: flex;
		align-self: center;
		justify-self: center;
	}
`;
export const EnctTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	text-align: center;
	width: 100%;
	margin: 0;
	padding: 0;
	color: var(--text);
	span {
		font-size: 0.7rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		text-shadow: var(--shadow);
	}
	h3 {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		text-shadow: var(--shadow);
	}
	span img {
		margin: 0;
		padding: 0;
	}
	span.torntrue {
		color: var(--color-secondary);
		animation: ${blink} 1.5s infinite;
	}
	span.tornfalse {
		color: #46dff0;
	}
`;

export const EnctInfo = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	margin: 0;
	padding: 0.5rem;

	color: var(--text);
	h3 {
		font-size: 0.8rem;
		text-shadow: var(--shadow);
	}

	h4 {
		font-size: 1rem;
		display: flex;
		text-shadow: var(--shadow);
	}
	.l {
		font-size: 0.8rem;
		box-shadow: 0.1rem 0.05rem 0.32rem #777;
		padding-right: 1.2rem;
		text-align: right;
		border: 1px solid var(--border);
		background: var(--color-clar);
	}
	.marcador {
		padding: 0.5rem;
		border-radius: 0.5rem;
		display: flex;
		width: 100%;
		height: 3.8rem;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	.marcadorcentral {
		padding: 0.5rem;
		border-radius: 0.5rem;
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	li span,
	span {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin-bottom: 0.6rem;
		text-shadow: var(--shadow);
	}

	.r {
		font-size: 0.8rem;
		text-align: left;
		display: flex;
		justify-content: center;
		border: 1px solid var(--border);
		background: var(--color-clar);
		box-shadow: 0.1rem 0.05rem 0.32rem #777;
	}
	ul,
	li {
		list-style: none;
		display: flex;
		flex-direction: column;
	}
	li h5 {
		font-size: 1rem;
		font-weight: bold;
	}
	li p {
		font-size: 0.8rem;
		font-weight: normal;
	}
`;
export const RespostesBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	background: var(--color-clar);
	border-radius: 0.3rem;
	width: 100%;

	div.true {
		background: #99999992;
	}
	div.true::after {
		content: "x";
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.4rem;
	}
	.r {
		text-align: right;
	}
`;
export const Vida = styled.div`
	display: flex;
	margin: auto;
	width: 0.49rem;
	height: 0.49rem;
	border: 2px solid var(--textatt);
	drop-shadow: 1rem 1rem 10px #444444;
	background-color: red;
	border-radius: 10rem;
`;
export const VidaActiva = styled.div`
	display: flex;
	margin: auto;
	width: 0.49rem;
	height: 0.49rem;
	border: 2px solid var(--textatt);
	drop-shadow: 1rem 1rem 10px #444444;
	background-color: white;
	border-radius: 10rem;
	animation: ${blink} 2.5s infinite;
`;
export const Muerte = styled.div`
	display: flex;
	margin: auto;
	width: 0.49rem;
	height: 0.49rem;
	border: 2px solid var(--textatt);
	drop-shadow: 1rem 1rem 10px #444444;
	background: #99999992;
	border-radius: 10rem;
`;
export const MuerteActiva = styled.div`
	display: flex;
	margin: auto;
	width: 0.49rem;
	height: 0.49rem;
	border: 1px solid white;
	drop-shadow: 1rem 1rem 5px #444444;
	background: #99999992;
	border-radius: 10rem;
	animation: ${blink} 2.5s infinite;
`;
export const SplashStopper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background: transparent;
	bottom: 0;
	z-index: 98;
	cursor: default;
`;
export const WaitForOther = styled.div`
	width: auto;
	height: 100%;
	display: flex;
	color: var(--text);
	align-items: center;
	justify-content: center;
	font-size: 0.8rem;
	text-align: center;
	font-weight: bold;
	padding: auto;

	font-family: "Varela Round", sans-serif;
`;
export const DefinicioBox = styled.div`
	display: flex;
	flex-direction: column;

	text-align: left;
	width: 100%;
	margin: 0;
	padding: 0.5rem;
	border-left: 1px solid var(--border);
	border-right: 1px solid var(--border);
	color: var(--text);
	h4 {
		display: flex;
		font-size: 1.2rem;
		margin-bottom: 1rem;
		width: 100%;
		text-shadow: var(--shadow);
	}
	p {
		display: flex;
		padding: 0 1rem;
		font-size: 0.8rem;
		color: black;
		letter-spacing: 0.043rem;
	}
`;
export const WordFieldBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
	h4 {
		display: flex;
		font-size: 1.2rem;
		margin-bottom: 1rem;
		width: 100%;
	}
`;
export const ParaulaBox = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;
export const WordField = styled.div`
	min-width: 0.4rem;
	width: 100%;
	height: 2.8rem;
	border-radius: 0.5rem;
	border: 1px solid #dedede;
	background-color: white;
	overflow: hidden;
	perspective: 1000px;
	transition: transform 0.8s;
	transform-style: preserve-3d;

	span {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		margin: 0;
		padding: auto;
		color: black;
		text-align: center;
		width: 100%;
		height: 100% !important;
		height: inherit;
		text-transform: uppercase;
	}
`;
export const EnctRespostaForm = styled.form`
	display: flex;
	flex-direction: column;

	text-align: center;
	width: 100%;
	margin: 0;
	padding: 0.5rem;
	border-left: 1px solid var(--border);
	border-right: 1px solid var(--border);
	color: var(--text);
	h4 {
		display: flex;
		justify-content: center;
		font-size: 1rem;
		margin-bottom: 1rem;
		width: 100%;
		text-shadow: var(--shadow);
	}
	input {
		width: 100%;
		height: 2.6rem;
		padding-left: 0.4rem;
		margin-bottom: 1rem;
		outline: none;
		border: none;
		border-radius: 0.2rem;
		text-transform: uppercase;
	}
	button {
		border: 0;
		display: flex;
		font-size: 1rem;
		text-shadow: 1px 1px rgb(0, 0, 80);
		justify-content: center;
		letter-spacing: 0.03rem;
		font-family: "Varela Round", sans-serif;
	}
	button.btn-danger {
		background: var(--bg-childs) !important;
		&:hover {
			background: #333 !important;
			text-shadow: none;
		}
	}
`;
export const EnctBotoneraBox = styled.div`
	display: grid;
	margin-top: 0.8rem;
	grid-template-columns: 1fr 1fr;
	grid-gap: 0.5rem;
`;
export const RespostesBoxContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 0;
	padding: 0;
	width: 100%;
	div.or1 {
		order: 1;
	}
	div.or3 {
		order: 2;
	}
	div.or2 {
		order: 3;
	}
`;
export const ChancesContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0.3rem;
	width: 100%;
	border-radius: 0.3rem;
	background-color: #ffffff22;
	justify-content: space-between;
	align-items: flex-start;
	.or1 {
		order: 1;
	}

	.or2 {
		order: 2;
		align-self: flex-end;
		justify-content: flex-end;
	}
	span.index {
		display: flex;
		align-self: center;
		justify-content: center;
		color: var(--text-par);
		border-radius: 5rem;
		font-size: 8px;
	}
	.loose {
		width: 0.8rem;
		filter: grayscale(100%);
	}
	.win {
		width: 0.8rem;
	}
	span.paraula {
		color: var(--text-par);

		font-size: 0.7rem;
	}
	div.block {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: space-around;
		width: 50%;
		padding: 0.5rem;
	}
	div.resultlist {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: space-around;
		background-color: #ffffff25;
		border-radius: 0.17rem;
		margin-bottom: 0.3rem;
	}
	div.resultlistright {
		justify-content: flex-end;
	}
	div.resultlist span {
		font-family: verdana;
		font-weight: normal;
		display: flex;
		width: auto;
		padding: 0px 0.9rem;
	}
	span.remaining {
		font-size: 0.5rem;
		color: var(--text);
	}
	h5 {
		font-size: 0.8rem;

		text-shadow: 0.05rem 0.1rem 3px var(--color-fosc);
		border-bottom: 3px solid var(--border);
		padding-bottom: 0.3rem;
	}
	.teu {
		color: var(--color-secondary);
	}
	.seu {
		color: var(--color-fosc);
	}
`;
export const ParaulesRespostesBox = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	width: 100%;
	margin: 0;
	padding: 0.5rem;
	h4 {
		font-size: 1rem;
		text-shadow: 0.05rem 0.1rem 3px var(--color-fosc);
	}
`;
export const ParaulesIdecBox = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 100%;

	padding: 2rem;
	h5 {
		font-size: 1rem;
		color: var(--textclar);
		font-weight: bold;
		letter-spacing: 0.1rem;
	}
	p {
		font-size: 0.7rem;
		width: 75%;
		color: var(--text-par);
	}
	ul,
	li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	div.thankyou {
		display: flex;
		width: auto;
		justify-content: flex-end;
		height: 3rem;
		margin-top: 1rem;
	}
	div.thankyou span {
		font-size: 0.6rem;
		padding-right: 0.3rem;
	}
	img {
		object-fit: contain;
		height: 2rem;
	}
	a {
		margin-right: 0.2rem;
	}
`;
