import React, { Component } from "react";
import { Container, Row, Col, Button } from "shards-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

class Home extends Component {
	render() {
		return (
			<Container className="home padding-section">
				<Row className="home-text d-flex justify-content-center mx-auto align-items-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						<Col>
							<Row>
								<Col className="p-md-3">
									<h2 className="title text-center">
										<strong>Vad är den verkliga nybilskostnaden?</strong>
									</h2>
								</Col>
							</Row>
							<Row>
								<Col md="8" lg="7" xs="11" className="mx-auto px-md-3 py-2">
									<h5 className="subtitle">
										I det här verktyget kan du beräkna och jämföra den total
										ägandekostnaden för nyproducerade personbilar. Sök efter en
										bil och skapa egna kostnadskalkyler utifrån dina
										förutsättningar.
									</h5>
								</Col>
							</Row>
							<Row>
								<Link to="/sok" className="mx-auto">
									<Button pill theme="light" size="lg">
										Gör en kalkyl
									</Button>
								</Link>
							</Row>
						</Col>
					</motion.div>
				</Row>
			</Container>
		);
	}
}

export default Home;
