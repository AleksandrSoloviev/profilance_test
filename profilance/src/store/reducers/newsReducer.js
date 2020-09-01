const initialState = {
    news: [{
        title: "RDS GP Игора Драйв",
        description: "На Игоре Драйв сегодня мощно дают угла — там идёт этап российской дрифт-серии.\n" +
            "\n" +
            "Тачки с 1000 лошадок под капотом, дуэльная система, двукратный чемпион мира Георгий Чивчян в качестве хедлайнера — и много рёва, дыма и борьбы колесо в колесо на грани срыва.",
        data: "Mon Aug 31 2020 16:30:11 ",
        approve: true
    }],
    filteredNews:[{}]
};

export default function newsReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_NEWS":
            return {
                ...state,
                news: [...state.news, action.data]
            };
        case "DELETE_NEWS":
            return {
                news: [...state.news, action.data]
            };
        case "FILTERED_NEWS":
            return {
                ...state,
                filteredNews: [...state.filteredNews, action.data]
            };
        default:
            return state
    }
}