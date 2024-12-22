# useCallback

o que é?
- hook do React respinsável por retornar uma função callback que só muda se uma das dependências mudar. Resumindo é um memorizador de funções a partir das dependências informadas.

Motivação de uso: é necessária para otimizar o desempenho dde componentes que passam funções para componentes filhos, evitando renderizações desnecessárias.Possibilitando: otimização de desempenho, evitando renderizações desnecessárias e mantém a mesma referência da função entre renderizações, a menoss que as dependências sejam modificadas.