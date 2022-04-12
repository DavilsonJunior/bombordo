import PdfPrinter from 'pdfmake';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Movement from '../models/Movement';
import Container from '../models/Container';

class ReportContoller {
  async show(req, res) {
    const [,  { rowCount, rows } ] = await Movement.sequelize.query(
      'SELECT containers.cliente, containers.numero_container, movements.tipo_de_movimentacao, movements.updated_at FROM movements INNER JOIN containers ON movements.id_container = containers.id',
      {
        raw: true,
      }
    );

    rows.sort(function(a,b) {
      if (a.cliente < b.cliente) return -1;
      if (a.cliente > b.cliente) return 1;
      return 0;
    });

    const { count: totalExportacao } = await Container.findAndCountAll({ where: { categoria: 'Exportação' } })
    const { count: totalImportacao } = await Container.findAndCountAll({ where: { categoria: 'Importação' } })

    return res.json({
      movimentacaoAgrupadasPorClientes: rows,
      totalMovimentacao: rowCount,
      totalExportacao,
      totalImportacao
    });
  }

  async index(req, res) {
    const [,  { rowCount: totalMovimentacoes, rows: movements } ] = await Movement.sequelize.query(
      'SELECT containers.cliente, containers.numero_container, movements.tipo_de_movimentacao, movements.updated_at FROM movements INNER JOIN containers ON movements.id_container = containers.id',
      {
        raw: true,
      }
    );

    movements.sort(function(a,b) {
      if (a.cliente < b.cliente) return -1;
      if (a.cliente > b.cliente) return 1;
      return 0;
    });

    const { count: totalExportacao }  = await Container.findAndCountAll({ where: { categoria: 'Exportação' } });
    const { count: totalImportacao }  = await Container.findAndCountAll({ where: { categoria: 'Importação' } })

    const totalExportacaoPorImportacao = totalExportacao / totalImportacao;

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      }
    }

    const printer = new PdfPrinter(fonts);

    const body = [];

    for await (const movement of movements) {
      const rows = [];
      rows.push(movement.cliente);
      rows.push(movement.tipo_de_movimentacao);
      rows.push(movement.numero_container);
      rows.push(format(movement.updated_at, "dd 'de' MMMM 'de' yyyy", { locale: pt }));

      body.push(rows);
    }

    const docDefinition = {
      defaultStyle: { font: 'Helvetica' },
      content: [
        {
          columns: [
            {  text: 'Relatório de Movimentações', style: 'header'  },
            {  text: `${format(new Date(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: pt })  }\n\n`, style: 'header'  },
          ]

        },
       {
        table: {
          heights () {
            return 20;
          },
          // widths: [100, 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Cliente', style: 'columnsTitle' },
              { text: 'Tipo de Movimentação', style: 'columnsTitle' },
              { text: 'Numero do container', style: 'columnsTitle' },
              { text: 'Ultima atualização', style: 'columnsTitle' },
            ],
            ...body,
          ],
        }
       },
       {text: '\n\nSumário\n\n', style: 'subheader'},
       {
        table: {
          heights () {
            return 20;
          },
          body: [
            [
              { text: 'Total de Movimentações', style: 'columnsTitle' },
              { text: totalMovimentacoes, style: 'lineTitle' }
            ],
            [
              { text: 'Total de Exportação', style: 'columnsTitle' },
              { text: totalExportacao, style: 'lineTitle' }
            ],
            [
              { text: 'Total de Importação', style: 'columnsTitle' },
              { text: totalImportacao, style: 'lineTitle' }
            ],
            [
              { text: 'Total Exportação / Importação', style: 'columnsTitle' },
              { text: totalExportacaoPorImportacao, style: 'lineTitle' }
            ],
          ],
        }
       }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color: '#1F2937',
          alignment: 'justify',
        },
        columnsTitle: {
          fontSize: 12,
          bold: true,
          fillColor: '#5048E5',
          color: "#FFF",
          alignment: 'justify',
          margin: 5,
        },
        lineTitle: {
          fontSize: 12,
          color: "#1F2937",
          margin: 5,
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          color: '#1F2937',
          alignment: 'justify',
        }
      }
    }

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  const chunks = [];

  pdfDoc.on('data', (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.end();

  pdfDoc.on('end', () => {
    const result = Buffer.concat(chunks)
    res.end(result);
  })
  }
}

export default new ReportContoller();
