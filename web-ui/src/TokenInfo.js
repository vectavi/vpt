import React                from 'react';
import TextField            from 'material-ui/TextField';
import RandomIcon           from 'material-ui/svg-icons/places/ac-unit';

import
  { Table, TableBody, TableRow, TableRowColumn
  } from 'material-ui/Table';

import TextFieldContainer   from './TextFieldContainer';
import TokenPhaseText       from './TokenPhaseText';

export default class TokenInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { etherVal: '' };
  }


  _etherValChanged = ev => this.setState({
    etherVal: ev.target.value.replace(/[^\.0-9]/g, '')
  });

  _buyTokens = () => this.props.onBuyTokens(this.state.etherVal);


  render() {
    const {info} = this.props;

    const row = (name, value) => (
      <TableRow>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{value}</TableRowColumn>
      </TableRow>
    );

    const buttonStyle = {
      marginLeft: '5em'
    };

    const phaseBlock =
      [ <p><b>Presale is not yet started.</b> Please check this page later.</p>
      , <div>
          <TokenPhaseText
            boldText={'Presale is in progress.'}
            normalText={' You can buy some tokens here.'}
          />
          <TextFieldContainer txtHintText="Value in Ether"
              txtValue={this.state.etherVal}
              txtOnChange={this._etherValChanged}
              btnSecondary={true}
              btnIcon={<RandomIcon/>}
              btnLabel="Buy tokens"
              btnStyle={{margin: '12px'}}
              btnOnClick={this._buyTokens}
              btnDisabled={this.state.isReadOnly || !this.state.etherVal}
          />
        </div>
      , <TokenPhaseText
          boldText={'Presale is paused.'}
          normalText={' Please come back later.'}
        />
      , <TokenPhaseText
          boldText={'Presale is over.'}
          normalText={' You can now migrate your tokens.'}
        />
      , <TokenPhaseText
          boldText={'Presale is over.'}
          normalText={' Migration is over too.'}
        />
      ];

    return (
      <div>
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            {row("Name", info.name)}
            {row("Symbol", info.symbol)}
            {row("Price", `${info.price} ${info.symbol} per 1 ETH`)}
            {row("Tokens sold", `${info.supply} ${info.symbol}`)}
            {row("Current balance", `${info.balance} ETH`)}
          </TableBody>
        </Table>
        { phaseBlock[info.currentPhase] }
      </div>
    );
  }
}
