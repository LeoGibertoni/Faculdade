using exercicio;

IPagamento ClienteCeline = new PagamentoCartaoCredito();
ClienteCeline.processarPagamento(150);
ClienteCeline.estornarPagamento(150);

IPagamento ClienteMateux = new PagamentoPayPal();
ClienteMateux.processarPagamento(200);
ClienteMateux.estornarPagamento(200);

IPagamento ClienteLeo = new PagamentoPix();
ClienteLeo.processarPagamento(100); 
ClienteLeo.estornarPagamento(100);