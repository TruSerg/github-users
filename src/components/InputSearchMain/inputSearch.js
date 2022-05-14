import { useEffect, useState } from "react";
import axios from "axios";

import InputSearchLayout from "./inputSearchLayout";

const InputSearch = () => {
  const [inputSearchUserName, setInputSearchUserName] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [userReposList, setUserReposList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(4);

  const BASE_URL = "https://api.github.com";

  const setUserData = ({
    name,
    login,
    html_url,
    followers,
    following,
    avatar_url,
    public_repos,
  }) => {
    setUser({
      name,
      login,
      url: html_url,
      followers,
      following,
      avatar: avatar_url,
      repos: public_repos,
    });
  };

  const handleUserSearch = (e) => {
    setInputSearchUserName(e.target.value);
  };

  const getUserName = async () => {
    setIsLoading(true);

    try {
      await axios
        .get(`${BASE_URL}/users/${inputSearchUserName}`)
        .then((res) => {
          res.data.message ? setError(error.message) : setUserData(res.data);
          setError(null);
        });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const getUserRepos = async () => {
    try {
      await axios
        .get(
          `${BASE_URL}/users/${user.login}/repos?per_page=${reposPerPage}&page=${currentPage}`
        )
        .then((res) => {
          setUserReposList(res.data);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setIsUserDataLoaded(true);

    getUserName();
  }, []);

  useEffect(() => {
    getUserRepos();
  }, [currentPage, reposPerPage, userReposList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    getUserName();
    getUserRepos();

    setInputSearchUserName("");
    setIsUserDataLoaded(false);
  };

  return (
    <div>
      <InputSearchLayout
        inputSearchUserName={inputSearchUserName}
        name={user.name}
        login={user.login}
        url={user.url}
        followers={user.followers}
        following={user.following}
        avatar={user.avatar}
        repos={user.repos}
        error={error}
        isLoading={isLoading}
        isUserDataLoaded={isUserDataLoaded}
        userReposList={userReposList}
        handleChange={handleUserSearch}
        handleSubmit={handleSubmit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        reposPerPage={reposPerPage}
      />
    </div>
  );
};

export default InputSearch;
