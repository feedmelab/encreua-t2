import React, { useContext, useEffect, useState } from "react";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import CountDownTimer from "../CountDownTimer/CountDownTimer";

import {
	ChancesContainer,
	DefinicioBox,
	EnctBotoneraBox,
	EnctBox,
	EnctContainer,
	EnctInfo,
	EnctTitle,
	EnctRespostaForm,
	Vida,
	VidaActiva,
	Muerte,
	MuerteActiva,
	RespostesBox,
	WaitForOther,
	WordField,
	WordFieldBox,
	ParaulaBox,
	ParaulesRespostesBox,
	ParaulesIdecBox,
	SplashStopper,
	EnctBoxLoader,
	RespostesBoxContainer,
} from "./Encreuat.styles";

export type IPlayerRespostes = Array<Array<string | number | null>>;
export type IPlayerResultats = Array<string | null>;
export type IPlayerTimes = Array<Array<string | number | null>>;
export type IPlayerPreguntes = Array<string>;
export type IPlayerFetch = string;
export interface IStartJoc {
	start: boolean;
	symbol: "A" | "B";
	room: string;
	dades: [];
}

export function EncreuatGame() {
	const [resultat, setResultat] = useState<IPlayerResultats>([null, null, null, null, null]);
	const [chances, setChances] = useState<IPlayerRespostes>([[null, null], [null, null], [null, null], [null, null], [null, null], [0]]);
	const [times, setTimes] = useState<IPlayerTimes>([
		[null, null],
		[null, null],
		[null, null],
		[null, null],
		[null, null],
	]);

	const {
		room,
		setRoom,
		playerSymbol,
		setPlayerSymbol,
		fase,
		setFase,
		setPlayerTurn,
		isPlayerTurn,
		setGameStarted,
		isGameStarted,
		isGameEnded,
		setGameEnded,
		playerRes,
		setPlayerRes,
		dades,
		setDades,
	} = useContext(gameContext);

	const [a_paraula, setAParaula] = useState<Array<string>>([]);
	const [remaining, setRemaining] = useState<number | null>(null);
	const updateGameChances = async (event: React.FormEvent | null, fase: number, puntero: number, resposta: string) => {
		if (event) event.preventDefault();

		if (fase < 5) {
			const newChances = [...chances];
			const newTimes = [...times];
			if (newChances[fase][puntero] === "" || newChances[fase][puntero] === null) {
				newChances[fase][puntero] = resposta;
				newTimes[fase][puntero] = remaining;
				setChances(newChances);
				setTimes(newTimes);
			}

			if (socketService.socket) {
				gameService.updateGame(socketService.socket, newChances, newTimes);

				setPlayerTurn(false);

				setPlayerRes("");

				if (fase === 4) checkLastRound(newChances);
			}
		}
	};

	const handleGameUpdate = () => {
		if (socketService.socket)
			gameService.onGameUpdate(socketService.socket, (newChances, newTimes) => {
				setChances(newChances);
				setTimes(newTimes);
				handleGameUpdate();
				setPlayerTurn(true);

				checkLastRound(newChances);
			});
	};
	const handleStage = () => {
		if (fase < 5) {
			const faltanRespuestas = times[fase].filter((r) => r === null);

			if (faltanRespuestas.length === 0) {
				const timeWinner = times[fase].reduce((acc, curr) => {
					return acc > curr ? acc : curr;
				});
				const playerWinner: string = timeWinner !== times[fase][0] ? "A" : "B";
				console.log("win?", playerWinner);
				const newResultat = [...resultat];
				newResultat[fase] = playerWinner;
				console.log("Taula de reultats previa al set:\n", newResultat);
				setResultat(newResultat);
				//
				setFase(chances[5][0]);
			}
		}
	};
	// const handleResults = (times: any) => {
	// 	console.log(playerSymbol);
	// 	const timeWinner = times[fase].reduce((acc: string, curr: string) => {
	// 		return acc > curr ? (playerSymbol === "A" ? "A" : "B") : playerSymbol === "B" ? "B" : "A";
	// 	});
	// 	const newResultat = [...resultat];
	// 	newResultat[fase] = timeWinner;

	// 	setResultat(newResultat);

	// 	//return timeWinner;
	// };
	const handleName = (name: any, flag: boolean) => {
		const n = name.replace(/[a-zA-ZÀ-ú]/gi, "*");
		return flag ? n : name;
	};

	const handleTimer = () => {
		if (fase < 5) updateGameChances(null, fase, playerSymbol === "A" ? 0 : 1, "Passo");
	};
	const handleStartJoc = () => {
		if (socketService.socket)
			gameService.onStartGame(socketService.socket, (options) => {
				setDades(options.dades);

				setGameStarted(true);
				setPlayerSymbol(options.symbol);
				setRoom(options.room);
				if (options.start) setPlayerTurn(true);
				else setPlayerTurn(false);
			});
	};

	const handleRemaining = (r: number = 0) => {
		if (r) {
			setRemaining(25 - (r - 1));
		}
	};
	const checkLastRound = (newChances: any) => {
		if (fase === 4) {
			const isLastPlayer = newChances[4].some((r: any) => r === null);
			//es la ultima jugada
			if (!isLastPlayer) {
				setPlayerTurn(false);
				setGameEnded(true);
			}
		} else return;
	};

	const getResults = (fase: number, puntero: number) => {
		const base = dades[fase][puntero];
		//console.log(base);
	};
	useEffect(() => {
		handleGameUpdate();
	});
	useEffect(() => {
		handleStage();
	});
	useEffect(() => {
		handleStartJoc();
	});

	const handleInputRes = (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		const inputRes = e.target.value;
		setPlayerRes(inputRes);
	};

	return (
		<EnctContainer>
			<EnctBox>
				<EnctTitle>
					{!isGameStarted && <WaitForOther>Esperant a un altre contrincant per a començar...</WaitForOther>}
					{isGameStarted && (
						<div className="d-flex flex-row justify-content-around">
							<span>SALA: {room}</span>
							<h3>Jugador: {playerSymbol}</h3>
							<span>Fase: {fase}</span>
						</div>
					)}
				</EnctTitle>
			</EnctBox>
			{isGameEnded ? (
				<>
					<EnctBox>
						<ParaulesRespostesBox>
							<h4>La partida ha finalitzat</h4>

							<ChancesContainer>
								<div className={playerSymbol === "A" ? "or1 block l" : "or2 block l"}>
									<h5 className={playerSymbol === "A" ? "teu" : "seu"}>
										{playerSymbol === "A" ? "Les teves respostes" : "Les seves respostes"}
									</h5>
									{chances.map((chance, index) =>
										index < 5 ? (
											<div key={index}>
												{chance[0] ? (
													<div className="resultlist">
														<span className={playerSymbol === "A" ? "or1 index" : "or2 index"}>
															<img
																className={resultat[index] === "A" && playerSymbol === "A" ? "win" : "loose"}
																src="/asterisc_encreuat.svg"
																alt=""
															/>
														</span>
														<span className={playerSymbol === "B" ? "or1 " : "or2 "}>
															{playerSymbol === "A" ? (
																<>
																	<span className="paraula">{handleName(chance[0], false)}</span>
																	<span className="remaining">({times[index][0]} s.)</span>
																</>
															) : (
																<>
																	<span className="remaining">({times[index][0]} s.)</span>
																	<span className="paraula">{handleName(chance[0], false)}</span>
																</>
															)}
														</span>
													</div>
												) : null}
											</div>
										) : null
									)}
								</div>
								<div className={playerSymbol === "B" ? "or1 block l" : "or2 block l"}>
									<h5 className={playerSymbol === "B" ? "teu" : "seu"}>
										{playerSymbol === "B" ? "Les teves respostes" : "Les seves respostes"}
									</h5>
									{chances.map((chance, index) =>
										index < 5 ? (
											<div key={index}>
												{chance[1] ? (
													<div className="resultlist">
														<span className={playerSymbol === "A" ? "or2 index" : "or1 index"}>
															<img
																className={resultat[index] === "B" && playerSymbol === "B" ? "win" : "loose"}
																src="/asterisc_encreuat.svg"
																alt=""
															/>
														</span>
														<span className={playerSymbol === "B" ? "or2" : "or1"}>
															{playerSymbol === "B" ? (
																<>
																	<span className="paraula">{handleName(chance[1], false)}</span>
																	<span className="remaining">({times[index][1]} s.)</span>
																</>
															) : (
																<>
																	<span className="remaining">({times[index][1]} s.)</span>
																	<span className="paraula">{handleName(chance[1], false)}</span>
																</>
															)}
														</span>
													</div>
												) : null}
											</div>
										) : null
									)}
								</div>
							</ChancesContainer>
						</ParaulesRespostesBox>
					</EnctBox>
					<EnctBox>
						<ParaulesIdecBox>
							<ul>
								{[...dades].map((dada: any, index: number) => {
									return (
										<li>
											<h5>{dada.d.nom}</h5>
											<p>{dada.d.descripcio}</p>
										</li>
									);
								})}
							</ul>
							<div className="thankyou">
								<span>Agraïments a:</span>
								<a href="https://dlc.iec.cat/" rel="noreferrer" target="_blank">
									<img src="/LOGO_IEC2.png" alt="" />
								</a>
								<a href="https://vilaweb.cat/" rel="noreferrer" target="_blank">
									<img src="/vilaweb.png" alt="" />
								</a>
							</div>
						</ParaulesIdecBox>
					</EnctBox>
				</>
			) : null}
			{isGameStarted && !isGameEnded ? (
				<>
					<EnctBox>
						<ParaulesRespostesBox>
							<EnctInfo>
								<RespostesBoxContainer>
									<div className={playerSymbol === "A" ? "or1 l marcador" : "or2 r marcador"}>
										<span>Jugador A</span>
										<RespostesBox>
											{chances.map((chance, index) =>
												index < 5 ? (
													chance[0] === null ? (
														index !== fase ? (
															<Muerte key={index} />
														) : (
															<VidaActiva key={index} />
														)
													) : playerSymbol === "A" ? (
														<Vida key={index} />
													) : (
														<Vida key={index} />
													)
												) : null
											)}
										</RespostesBox>
									</div>
									<div className="or3 marcadorcentral">
										<h4>Respostes</h4>
										{isPlayerTurn && fase < 5 ? (
											<CountDownTimer inititalSeconds={10} onendtimer={() => handleTimer()} setRemaining={handleRemaining} />
										) : null}
									</div>
									<div className={playerSymbol === "B" ? "or1 r marcador" : "or2 r marcador"}>
										<span>Jugador B</span>
										<RespostesBox>
											{chances.map((chance, index) =>
												index < 5 ? (
													chance[1] === null ? (
														index !== fase ? (
															<Muerte key={index} />
														) : (
															<VidaActiva key={index} />
														)
													) : playerSymbol === "B" ? (
														<Vida key={index} />
													) : (
														<Vida key={index} />
													)
												) : null
											)}
										</RespostesBox>
									</div>
								</RespostesBoxContainer>
							</EnctInfo>
							{/* <ChancesContainer>
								<div className={playerSymbol === "A" ? "or1 block l" : "or2 block l"}>
									{chances.map((chance, index) =>
										index < 5 ? (
											<div key={index}>
												{chance[0] ? (
													<div className="resultlist">
														<span className={playerSymbol === "A" ? "or1 index" : "or2 index"}> {index + 1} </span>
														<span className={playerSymbol === "B" ? "or1" : "or2"}>
															{handleName(chance[0], playerSymbol === "B" ? true : false)}
															<span className="remaining">[{times[index][0]} s.]</span>
														</span>
													</div>
												) : null}
											</div>
										) : null
									)}
								</div>
								<div className={playerSymbol === "B" ? "or1 block r" : "or2 block r"}>
									{chances.map((chance, index) =>
										index < 5 ? (
											<div key={index}>
												{chance[1] ? (
													<div className="resultlist">
														<span className={playerSymbol === "A" ? "or2 index" : "or1 index"}> {index + 1} </span>
														<span className={playerSymbol === "B" ? "or2" : "or1"}>
															{handleName(chance[1], playerSymbol === "A" ? true : false)}
															<span className="remaining">[{times[index][1]} s.]</span>
														</span>
													</div>
												) : null}
											</div>
										) : null
									)}
								</div>
							</ChancesContainer> */}
						</ParaulesRespostesBox>
					</EnctBox>

					<EnctBox>
						<DefinicioBox>
							{isPlayerTurn && fase < 5 ? (
								<>
									<h4>Definició:</h4>
									<p>{dades[fase].d.descripcio}</p>
								</>
							) : (
								<>
									{!isPlayerTurn ? (
										<span className="d-flex flex-row justify-content-center align-center">
											<img src="/loading_balls.svg" alt="" /> Torn del contrincant
										</span>
									) : null}
								</>
							)}

							<WordFieldBox>
								<ParaulaBox>
									{isPlayerTurn && fase < 5
										? dades[fase].d.nom.split("").map((x: string, index: number) => (
												<WordField key={index}>
													<span>{index === 0 ? x : `*`}</span>
												</WordField>
										  ))
										: null}
								</ParaulaBox>
							</WordFieldBox>
						</DefinicioBox>
					</EnctBox>
					{isPlayerTurn && fase < 5 ? (
						<EnctBox>
							<EnctRespostaForm>
								<h4>La teva resposta</h4>
								<input type="text" required data-errormessage-value-missing="Digues quelcom raonable.." onChange={handleInputRes} />
								<EnctBotoneraBox>
									<button
										className="btn btn-secondary"
										type="button"
										onClick={(e: any) => updateGameChances(e, fase, playerSymbol === "A" ? 0 : 1, "Passo")}>
										PASSAR
									</button>
									<button
										className="btn btn-danger"
										type="button"
										onClick={(e: any) => updateGameChances(e, fase, playerSymbol === "A" ? 0 : 1, playerRes)}>
										ENVIAR
									</button>
								</EnctBotoneraBox>
							</EnctRespostaForm>
						</EnctBox>
					) : null}
				</>
			) : !isGameEnded ? (
				<EnctBoxLoader>
					<img src="/loading_balls.svg" alt="" />
				</EnctBoxLoader>
			) : null}
		</EnctContainer>
	);
}
