import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styled from "styled-components";
import CRate from "../../components/CRate/CRate";
import { getSessionItem } from "../../utils/utils";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
  background-color: var(--bg);
`;
const Main = styled.div`
  max-width: fit-content;
  width: 96%;
  height: 96%;
  flex-grow: 1;
  background-color: var(--content);
  margin: 20px auto;
  padding: 24px;
  box-shadow: 0px 0px 2px 1px #c7c5c5;
  display: flex;
  flex-direction: column;
  text-align: center;
  @media only screen and (max-width: 768px) {
    width: 96%;
    height: 96%;
  }
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const Figure = styled.figure`
  margin: 0;
  background: ghostwhite;
  padding: 1em;
  border-radius: 1em;
`;

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const Rated = () => {
  const [quotes, setQuotes] = useState(getSessionItem("ratedQuotes"));
  return (
    <>
      <Header />
      {quotes ? (
        <Container>
          {quotes.map((x, i) => {
            return (
              <Main key={i}>
                <Figure>
                  <blockquote>
                    <q>{x.text}</q>
                  </blockquote>
                  <figcaption>
                    &mdash;<cite>{x.author}</cite>
                  </figcaption>
                </Figure>
                <CRate
                  value={x.rated}
                  disabled={true}
                  desc={
                    x.rated ? (
                      <span className="ant-rate-text">{desc[x.rated - 1]}</span>
                    ) : (
                      ""
                    )
                  }
                />
              </Main>
            );
          })}
        </Container>
      ) : (
        <LoaderWrapper>
          <h3>No quotes found!</h3>
        </LoaderWrapper>
      )}
    </>
  );
};

export default Rated;
