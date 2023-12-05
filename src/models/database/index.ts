import pg from "pg";

const config = {
  user: "avnadmin",
  password: "AVNS_D9myc0_wUQqruSjDTBr",
  host: "pg-3011b0d4-test12334.a.aivencloud.com",
  port: 24487,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
  MIIEQTCCAqmgAwIBAgIUIU9HDA8dGk6ZXArXGTTaO4jMTbAwDQYJKoZIhvcNAQEM
  BQAwOjE4MDYGA1UEAwwvZmEyZGE5NDUtNWNjYy00NzI2LWIwMGYtYzgzNDk0NTc3
  NGIzIFByb2plY3QgQ0EwHhcNMjMxMjA1MjMyMTQxWhcNMzMxMjAyMjMyMTQxWjA6
  MTgwNgYDVQQDDC9mYTJkYTk0NS01Y2NjLTQ3MjYtYjAwZi1jODM0OTQ1Nzc0YjMg
  UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMrQ6Oyb
  vdjHi+dzzOLGqPIzCLhiKuCz+KNRPWzEg+eyVnp0ziTEVaPnqlfZ5seUmQM0Mk1Q
  ZTd2fNGuKybxyyZChX2S2bWX6zijoGF8zobv01YV4aW3xIH4cdxavAFGTrBdr391
  4b7Mef9+2nUnT706BzUwQeoeJUEOl2qYycNkR+WWSZbk/mw2hHl5GYoN5epb/AAp
  TVjTlOcNWzVtR7Vdk0JGO1peQxwJQtY3RxCqYakS11aZ8+SEvX+vfmxjytLyx4SC
  NBTTjwz97C94Uvq6AsJhmxuyPAHjgilvXGtwEb+O3YJQ2bPgeqQna5Zlsu4xJns5
  onIcnRbRiF1fWzy3LMC9IpGRLmLM4pGclVJ/cSO0vcQhRzehGjGYvfedPKvpLFN9
  i+j5iPFpZKUgKpFFu6xMiyqqlmLHp4vqUAKZZIHYit0siRGk6v4WFcb8xBM2EDuY
  zygpXzJZXEXJg19eoWTZMzxxzDnbZC0nuALWWBCmXg1qcXOKNAv6I4/tSwIDAQAB
  oz8wPTAdBgNVHQ4EFgQU/C3BazrJH3N3kbrodYMK5LHw6OEwDwYDVR0TBAgwBgEB
  /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACeiXcvj/VTt9e9D
  +y9o4VhmTllRSS1TB8gBZfX+44/5B79KQtCB0Lu11bo35Py+w+ZdFcE+SghRqgwE
  W0kFeVXvXC9a250Jxlzva5IlXLASxCjMksFbVzzagiyUXWBBcF/KAX5Zwdg1ORHM
  EOC3XxziO+oiNDJs7pvzKRfcCiAp3F+q8XSI/ZJHsUBUlO8sED+lbQoMFPdKxifY
  SNpspvE9aYrI25j2b+j53+IBUaKUwc4DUYB7llS9H0CSzdQLtO6RgT7rFz+pwRRZ
  rnEf2r2UvFK4x5hguEpj3NewhOoSKJUeh5r1Cqedf7GB/hmqkZccVHuv9cCFq00s
  RIVsBJHyEZpPxpmOl/zOWqvZl409kpnE73iOkW5VISkWsX9WbZTKqpTqxP06eyBj
  rN1+lw9r/Pl9Z5OkzH4kJR4iZ3jcYxolfx6ya9BD6wkyvykzYo1HC8wg4iy0Z36i
  KgPTWFYoNumcxY3lGC+nFWr4zAn6vVNVhlnMggx1MmP/i7DBTA==
  -----END CERTIFICATE-----`,
  },
};

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
