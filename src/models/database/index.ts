import pg from "pg";

const config = {};

const client = new pg.Client(config);
client.connect(function (err: Error) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err: Error, result: any) {
    if (err) throw err;

    console.log(result.rows[0].version);
    client.end(function (err: Error) {
      if (err) throw err;
    });
  });
});
