const res = (json1, json2, commonkey) => {
  json2.map(x =>
    Object.assign(
      x,
      json1.find(y => y.commonkey == x.commonkey)
    )
  );
};
