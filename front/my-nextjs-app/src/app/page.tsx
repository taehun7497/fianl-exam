'use client'

import React, { useEffect, useRef, useState } from 'react';
import { getPost } from './asiosApi/userApi';

export default function Home() {
  interface Post {
    id: number,
    title: string,
    content: string
  }
  const [page, setPage] = useState(0);
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const postRef = useRef<HTMLDivElement>(null);
  const [temp, setTemp] = useState(0);
  // 필요한 요청 파라미터를 조립하여 api로 부터 데이터 받아와 업데이트하는 함수
  const getWeather = () => {
      const key =
          "paJ%2BM8y80vWX8Gu5RWTDurJ0y5rQCX4tjEwLh0F%2FwfUABNbw%2BV2iJD%2FBahqq08K%2BvzgPyAU0GFZ84LmVfEDPgA%3D%3D";

      const dd = new Date();
      const y = dd.getFullYear();
      const m = ("0" + (dd.getMonth() + 1)).slice(-2);
      const d = ("0" + dd.getDate()).slice(-2);
      const ds = y + m + d;

      const dd2 = new Date();
      const h = ("0" + dd2.getHours()).slice(-2);
      const ts = `${h}00`;

      var url =
          "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey= " +
          key +
          "&pageNo=1&numOfRows=1000&dataType=JSON" +
          "&base_date=" +
          ds +
          "&base_time=" +
          ts +
          "&nx=67&ny=100";

      fetch(url)
          .then((res) => res.json())
          .then((data) => {
              console.log(data.response.body.items.item);
              const itemArr = data.response.body.items.item;
              const result = {};
              itemArr.forEach((item:any) => {
                  if (item.category === "T1H") {
                      setTemp(item.obsrValue);
                  }
              });
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPost(page).then(r => {
      console.log(r.content);
      setPostList(r.content);
      setMaxPage(r.totalPages);
      setPage(page + 1);
    }).catch(e => console.log(e));
  }, []);

  useEffect(() => {
    console.log(postList);
  }, [postList]);

  const loadPage = () => {
    const postbox = postRef.current;

    if (postbox != null) {
      const scrollLocation = postbox.scrollTop;
      const maxScroll = postbox.scrollHeight - postbox.clientHeight;
      if (!isLoading && scrollLocation >= maxScroll && page < maxPage - 1) {
        setIsLoading(true);
        getPost(page)
          .then(response => {
            if (response.size > 0) {
              const pagepost = [...postList, ...response.content];
              setPostList(pagepost);
              setMaxPage(response.totalPages);
              setPage(page + 1);
            }
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex border-black border-b-4 items-center justify-between p-4 sm:p-6 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl">LOGO</h2>
        </div>
        <div className="text-sm sm:text-base">
          날씨 : 맑음/비 (29도)
        </div>
        <div className="flex space-x-2 sm:space-x-4">
          <button className="cursor-pointer p-1 sm:p-2" onClick={() => window.location.href = "/create"}>글 작성</button>
          <button className="cursor-pointer p-1 sm:p-2">Login</button>
          <button className="cursor-pointer p-1 sm:p-2">Sign up</button>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div ref={postRef} onScroll={loadPage} className="w-full max-w-[900px] h-[800px] flex flex-wrap gap-4 items-center justify-center overflow-y-auto">
          {postList?.map((a: Post, index: number) => (
            <div key={index} className='w-full sm:w-[48%] md:w-[30%] h-[300px] bg-gray-300 flex items-center justify-center mb-4 hover:bg-gray-500 cursor-pointer' onClick={() => {
              window.location.href = "/create";
              localStorage.setItem("article", JSON.stringify(a));
            }}>
              <span>{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}