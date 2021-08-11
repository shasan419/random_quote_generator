import React, { useEffect, useState } from "react";
import { performGetApiCall } from "../../services/fetch.service";
import styled from "styled-components";
import Loader from "../../components/Loader/Loader";
import CButton from "../../components/CButton/CButton";
import CLink from "../../components/CLink/CLink";
import CRate from "../../components/CRate/CRate";
import Header from "../../components/Header/Header";
import { getSimilarQuote, getDifferentQuote } from "../../utils/utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg);
`;
const Main = styled.div`
  max-width: fit-content;
  width: 96%;
  max-height: 36%;
  flex-grow: 1;
  background-color: var(--content);
  margin: auto;
  padding: 24px;
  box-shadow: 0px 0px 2px 1px #c7c5c5;
  display: flex;
  flex-direction: column;
  text-align: center;
  @media only screen and (max-width: 768px) {
    max-width: 96%;
    max-height: 46%;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px;
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Figure = styled.figure`
  margin: 0;
  background: ghostwhite;
  padding: 1em;
  border-radius: 1em;
`;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

function Home() {
  const [allQuotes, setAllQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState([]);
  const [preRatedQuote, setPreRatedQuote] = useState({});
  const [rated, setRated] = useState(0);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    apiCall();
  }, []);

  async function apiCall() {
    setLoading(true);
    const data = await performGetApiCall();
    setAllQuotes(data);
    let random = Math.floor(Math.random() * (data.length - 0) + 0);
    setCurrentQuote(data[random]);
    // console.log(data);
    setLoading(false);
  } //performs api call and sets random quote to currentQuote

  function addToRatedQuotes() {
    const ratedOldArray = JSON.parse(sessionStorage.getItem("ratedQuotes"));
    if (ratedOldArray) {
      let found = false;
      for (let i = 0; i < ratedOldArray.length; i++) {
        if (ratedOldArray[i].text === currentQuote.text) {
          found = true;
          if (ratedOldArray[i].rated === rated) {
            // console.log("alreaady exists");
            break;
          } else {
            const ratedNewArray = [
              ...ratedOldArray.slice(0, i),
              {
                text: currentQuote.text,
                author: currentQuote.author,
                rated: rated,
              },
              ...ratedOldArray.slice(i + 1),
            ];
            sessionStorage.setItem(
              "ratedQuotes",
              JSON.stringify(ratedNewArray)
            );
            console.log(ratedNewArray);
          }
        }
      }
      if (!found) {
        const ratedNewArray = [
          ...ratedOldArray,
          {
            text: currentQuote.text,
            author: currentQuote.author,
            rated: rated,
          },
        ];
        sessionStorage.setItem("ratedQuotes", JSON.stringify(ratedNewArray));
        // console.log(ratedNewArray);
      }
    } else {
      const ratedNewArray = [
        {
          text: currentQuote.text,
          author: currentQuote.author,
          rated: rated,
        },
      ];
      sessionStorage.setItem("ratedQuotes", JSON.stringify(ratedNewArray));
      //   console.log(ratedNewArray);
    }
  }

  function getNewQuote() {
    addToRatedQuotes();
    if (rated > 3) {
      const allNewQuotes = allQuotes.filter(
        (x) => x.text !== preRatedQuote.text
      );
      const matchedQuote = getSimilarQuote(currentQuote.text, allNewQuotes);
      setPreRatedQuote({
        text: currentQuote.text,
        author: currentQuote.author,
        rated: rated,
      });
      setCurrentQuote(matchedQuote[0]);
      setRated(0);
    } else {
      const allNewQuotes = allQuotes.filter(
        (x) => x.text !== preRatedQuote.text
      );
      const unMatchedQuote = getDifferentQuote(currentQuote.text, allNewQuotes);
      setPreRatedQuote({
        text: currentQuote.text,
        author: currentQuote.author,
        rated: rated,
      });
      setCurrentQuote(unMatchedQuote[0]);
      setRated(0);
    }
  }

  return (
    <Container>
      <Header
        ratedButton={
          <CLink
            content={
              <CButton type="dashed" danger content={"View All Rated Quotes"} />
            }
            path={"/rated"}
          />
        }
      />
      {!loading && currentQuote ? (
        <Main>
          <Figure>
            <blockquote>
              <q>{currentQuote.text}</q>
            </blockquote>
            <figcaption>
              &mdash;<cite>{currentQuote.author}</cite>
            </figcaption>
          </Figure>
          <CRate
            tooltips={desc}
            value={rated}
            desc={
              rated ? (
                <span className="ant-rate-text">{desc[rated - 1]}</span>
              ) : (
                ""
              )
            }
            onChange={(value) => setRated(value)}
          />
          <ButtonWrapper>
            <CButton
              type="default"
              loading={loading}
              content="Give new quote!"
              onClick={() => getNewQuote()}
              style={{ backgroundColor: "ghostwhite" }}
            />
          </ButtonWrapper>
        </Main>
      ) : (
        <LoaderWrapper>
          <Loader text="Please wait..." />
        </LoaderWrapper>
      )}
    </Container>
  );
}

export default Home;
