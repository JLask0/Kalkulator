function KeyPad(props) {
    return (
    <div className="button">
    
    <button className="primary" name="(" onClick={
    e => props.onClick(e.target.name)}>(</button>
    <button className="primary" name=")" onClick={
    e => props.onClick(e.target.name)}>)</button>
    <button className="primary" name="C" onClick={
    e => props.onClick(e.target.name)}>C</button>
    <button className="primary" name="CE" onClick={
    e => props.onClick(e.target.name)}>CE</button><br />

    <button className="primary" name="1" onClick={
    e => props.onClick(e.target.name)}>1</button>
    <button className="primary" name="2" onClick={
    e => props.onClick(e.target.name)}>2</button>
    <button className="primary" name="3" onClick={
    e => props.onClick(e.target.name)}>3</button>
    <button className="secondary" name="*" onClick={
    e => props.onClick(e.target.name)}>X</button><br />

    <button className="primary" name="4" onClick={
    e => props.onClick(e.target.name)}>4</button>
    <button className="primary" name="5" onClick={
    e => props.onClick(e.target.name)}>5</button>
    <button className="primary" name="6" onClick={
    e => props.onClick(e.target.name)}>6</button>
    <button className="secondary" name="-" onClick={
    e => props.onClick(e.target.name)}>-</button><br />

    <button className="primary" name="7" onClick={
    e => props.onClick(e.target.name)}>7</button>
    <button className="primary" name="8" onClick={
    e => props.onClick(e.target.name)}>8</button>
    <button className="primary" name="9" onClick={
    e => props.onClick(e.target.name)}>9</button>
    <button className="secondary" name="+" onClick={
    e => props.onClick(e.target.name)}>+</button><br />

    <button className="secondary" name="." onClick={
    e => props.onClick(e.target.name)}>.</button>
    <button className="primary" name="0" onClick={
    e => props.onClick(e.target.name)}>0</button>
    <button className="secondary" name="/" onClick={
    e => props.onClick(e.target.name)}>/</button>
    <button className="secondary" name="=" onClick={
    e => props.onClick(e.target.name)}>=</button><br />

    </div>
 )
}
export default KeyPad