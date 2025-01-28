# useMemo

Por que um componente renderiza?
- Hooks changed (mudou estaddo, contexto, reducer);
- Props changed (mudou propriedades);
- Parent rerendered (componente pai renderizou);

Qual fluxo de renderização?
1- O React recria o HTML da interface daquele componente
2- Compara a versão do HTML recriada com a versão anterior
3- Se mudou alguma coisa, ele reescreve o HTML na tela


Memo:
0- Hooks changed, props changed( deep comparison)
0.1- Comparar a versão anterior dos hooks e props
0.2- Se mudou algo, ele vai permitir a nova renderização


o que é?
Função de ordem superior utilizada para otimizar o desempenho de componentes funcionais em React. Ele é responsável por memorizar o resultado da renderização de um componente e só renderiza se suas propriedades mudarem. Porém não deve ser utilizado como bala de prata, pois avaliar mudanças de componentes sem necessidade trás lentidão ao componente, é necessário avaliar se seu retorno HTML possui tamanho grande o suficiente para que possa avaliar e não renderizar de forma desnecessária.

Motivação de uso: otimização de desempenho, renderizações condicionais a partir de mudanças de estado ou contexto, simples de implementar